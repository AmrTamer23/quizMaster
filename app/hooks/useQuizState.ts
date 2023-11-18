"use client";
import { useState, useEffect } from "react";
import { QuizGenreType, QuizQuestion } from "../lib/types";
import { userContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { difficultyDecision, reformattedQuizData } from "../lib/utils";
import useSessionStorage from "./useSessionStorage";

const genreId: Record<QuizGenreType, number> = {
  cs: 18,
  sports: 21,
  geo: 22,
  history: 23,
};

export default function useQuizState(genre: QuizGenreType) {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const { userDetails, updatePoints } = userContext();
  const { setResult } = useSessionStorage();
  const router = useRouter();

  function endQuiz() {
    if (score > 5) {
      updatePoints(genre, score);
    }
    setResult(score, genre);
    router.push("/quiz/result");
  }

  useEffect(
    function () {
      async function fetchQuizData() {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=10&category=${
              genreId[genre]
            }&difficulty=${difficultyDecision(
              userDetails.pointsByGenre[genre]
            )}&type=multiple`
          );

          if (!response.ok) {
            throw new Error(`${response.status}`);
          }

          const data = await response.json();

          const quizData: QuizQuestion[] = data.results;

          if (quizData) {
            setQuizData(reformattedQuizData(quizData));
          }
        } catch (error) {
          const errorCode =
            error instanceof Error ? error.message : "Unknown Error";

          if (errorCode === "429") {
            setTimeout(() => {
              console.log("retrying");
              fetchQuizData();
            }, 500);
          }
        }
      }
      fetchQuizData();
    },
    [genre]
  );

  useEffect(() => {
    let newScore = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (
        quizData[i].correct_answer ===
        quizData[i].incorrect_answers[selectedAnswers[i]]
      ) {
        newScore += 1;
      }
    }
    setScore(newScore);
  }, [selectedAnswers]);

  useEffect(() => {
    if (quizData.length > 0) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          endQuiz();
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, quizData]);

  const handleSelectAnswer = (index: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      endQuiz();
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return {
    quizData,
    selectedAnswers,
    score,
    currentQuestionIndex,
    timeLeft,
    handleSelectAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
  };
}
