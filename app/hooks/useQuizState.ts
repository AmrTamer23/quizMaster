'use client';
import { useState, useEffect } from "react";
import { QuizCategorieType, QuizQuestion } from "../lib/types";
import fetchQuiz from "../lib/fetchQuiz";
import { userContext } from "../context/UserContext";
import {useRouter} from "next/navigation";

export default function useQuizState(genre: QuizCategorieType) {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const { user, userDetails, updateUserPoints } = userContext();
  const router = useRouter();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await fetchQuiz(genre as unknown as QuizCategorieType);

        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

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
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);


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
            score > 5 && updateUserPoints(user.uid, score+userDetails.points);
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
