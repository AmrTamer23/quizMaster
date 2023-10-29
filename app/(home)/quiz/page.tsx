"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formatTime } from "@/app/lib/utils";
import useQuizState from "@/app/hooks/useQuizState";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizCategorieType } from "@/app/lib/types";

const QuizPage = () => {
  const currGenre = useSearchParams().get("category");
  const genreDetails = getGenreDetails(currGenre as QuizCategorieType);
  const {
    currentQuestionIndex,
    timeLeft,
    quizData,
    handleSelectAnswer,
    selectedAnswers,
    handlePreviousQuestion,
    handleNextQuestion,
  } = useQuizState(currGenre as QuizCategorieType);

  const progress = (currentQuestionIndex / 10) * 100;

  console.log(quizData);

  return (
    <Suspense fallback={<p className="text-7xl">Loading.....</p>}>
      <div className="flex flex-col justify-center items-center w-full h-full lg:px-96">
        <span className="flex justify-between items-center w-11/12 mb-5">
          <span className="flex items-center gap-3 text-2xl">
            {genreDetails?.icon} {`${genreDetails?.title} Quiz`}
          </span>
          <span className="text-2xl self-end">
            Time Left : {formatTime(timeLeft)}
          </span>
        </span>
        <div className="h-1 w-11/12 relative">
          <span
            className=" bg-primary h-full absolute"
            style={{ width: `${progress}%` }}
          ></span>
        </div>
        <div className="h-3/5 w-full shadow-lg shadow-secondary rounded-2xl flex flex-col px-14 py-8 gap-4">
          <h5 className="text-secondary">Q{currentQuestionIndex + 1}</h5>
          <h2 className="text-3xl font-semibold">
            {quizData[currentQuestionIndex]?.question}
          </h2>
          <section className="mt-5 flex flex-col gap-5">
            {quizData[currentQuestionIndex]?.incorrect_answers.map(
              (option, index) => (
                <span
                  key={index}
                  className={`text-lg p-2 rounded-lg cursor-pointer ${
                    index === selectedAnswers[currentQuestionIndex]
                      ? "bg-accent "
                      : ""
                  }}`}
                  onClick={() => handleSelectAnswer(index)}
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
                  ? "bg-primary"
                  : "bg-emerald-500"
              } rounded-lg px-10 py-2`}
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
};

export default QuizPage;
