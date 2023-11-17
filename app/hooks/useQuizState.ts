"use client";
import { useState, useEffect } from "react";
import { QuizGenreType, QuizQuestion } from "../lib/types";
import { userContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { difficultyDecision, reformattedQuizData } from "../lib/utils";

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
  const router = useRouter();

  useEffect(function () {
    async function fetchQuizData() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${
            genreId[genre]
          }&difficulty=${difficultyDecision(
            userDetails.pointsByGenre[genre]
          )}&type=multiple`
        );
        const data = await response.json();

        const quizData: QuizQuestion[] = data.results;

        if (quizData) {
          setQuizData(reformattedQuizData(quizData));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuizData();
  }, []);

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
    if (quizData) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          sessionStorage.setItem(
            "quizResult",
            JSON.stringify({
              score: score,
              genre: genre,
            })
          );

          if (score > 5) {
            updatePoints(genre, score);
          }
          router.push("/quiz/result");
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
      sessionStorage.setItem(
        "quizResult",
        JSON.stringify({
          score: score,
          genre: genre,
        })
      );

      if (score > 5) {
        updatePoints(genre, score);
      }
      router.push("/quiz/result");
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
