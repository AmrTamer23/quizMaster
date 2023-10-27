"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import fetchQuiz from "@/app/lib/fetchQuiz";
import { QuizCategorieType, QuizQuestion } from "@/app/lib/types";
import { userContext } from "@/app/context/UserContext";
import { formatTime } from "@/app/lib/utils";
import getGenreDetails from "@/app/lib/getGenreDetails";

function QuizPage() {
  const currGenre = useSearchParams().get("category");
  const router = useRouter();
  const { user, updateUserPoints } = userContext();
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes
  const genre = getGenreDetails(currGenre as unknown as QuizCategorieType);

  useEffect(() => {
    // Fetch quiz data when the component mounts
    const fetchQuizData = async () => {
      try {
        const data = await fetchQuiz(currGenre as unknown as QuizCategorieType);

        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [currGenre]);

  const handleSelectAnswer = (index: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newSelectedAnswers);
  };

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
  }, [selectedAnswers, quizData]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      sessionStorage.setItem(
        "quizResult",
        JSON.stringify({
          score: score,
          genre: genre?.title,
        })
      );
      score > 5 && updateUserPoints(user.uid, score);
      router.push("/quiz/result");
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

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

  const progress = (currentQuestionIndex / 10) * 100;

  return (
    <Suspense fallback={<p className="text-7xl">Loading.....</p>}>
      <div className="flex flex-col justify-center items-center w-full h-full lg:px-96">
        <span className="flex justify-between w-11/12 mb-5">
          <span className="flex items-center gap-3 text-2xl">
            {genre?.icon} {`${genre?.title} Quiz`}
          </span>
          <span className="text-2xl self-end font-mono">
            Time Left : {formatTime(timeLeft)}
          </span>
        </span>
        <div className="h-1 w-11/12 relative">
          <span
            className=" bg-secondary h-full absolute"
            style={{ width: `${progress}%` }}
          ></span>
        </div>
        <div className="h-3/5 w-full bg-gray-200 rounded-2xl flex flex-col px-14 py-8 gap-4">
          <h5 className="text-gray-600">Q{currentQuestionIndex + 1}</h5>
          <h2 className="text-3xl font-semibold">
            {quizData[currentQuestionIndex]?.question}
          </h2>
          <section className="mt-5 flex flex-col gap-5">
            {quizData[currentQuestionIndex]?.incorrect_answers.map(
              (option, index) => (
                <span
                  key={index}
                  className="text-lg p-2 rounded-lg cursor-pointer"
                  onClick={() => handleSelectAnswer(index)}
                  style={{
                    backgroundColor:
                      index === selectedAnswers[currentQuestionIndex]
                        ? "#FFFFFF"
                        : "",
                  }}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              )
            )}
          </section>
          <span className="flex justify-between items-end h-full">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-600 rounded-lg px-10 py-2 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Previous Question
            </button>
            <button
              onClick={handleNextQuestion}
              className={`${
                currentQuestionIndex === quizData.length - 1
                  ? "bg-emerald-700"
                  : "bg-secondary"
              } rounded-lg px-10 py-2 text-white`}
            >
              {currentQuestionIndex === quizData.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          </span>
        </div>
      </div>
    </Suspense>
  );
}

export default QuizPage;
