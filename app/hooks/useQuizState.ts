"use client";
import { useState, useEffect } from "react";
import { QuizGenreType, QuizQuestion } from "../lib/types";
import fetchQuiz from "../lib/fetchQuiz";
import { userContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { difficultyDecision } from "../lib/utils";

export default function useQuizState(genre: QuizGenreType) {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const { userDetails, updatePoints } = userContext();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const difficulty = difficultyDecision(userDetails.pointsByGenre[genre]);
      try {
        const data = await fetchQuiz(genre, difficulty);
        if (isMounted) {
          setQuizData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [genre]);

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
            updatePoints(score + userDetails.points, genre, score);
          }
          router.push("/quiz/result");
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, quizData]);

  return {
    quizData,
    selectedAnswers,
    score,
    currentQuestionIndex,
    timeLeft,
    handleSelectAnswer: (index: number) => {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = index;
      setSelectedAnswers(newSelectedAnswers);
    },
    handleNextQuestion: () => {
      if (currentQuestionIndex === quizData.length - 1) {
        sessionStorage.setItem(
          "quizResult",
          JSON.stringify({
            score: score,
            genre: genre,
          })
        );

        if (score > 5) {
          updatePoints(score + userDetails.points, genre, score);
        }
        router.push("/quiz/result");
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    },
    handlePreviousQuestion: () => {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    },
  };
}
