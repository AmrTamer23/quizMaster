"use client";
import { Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";
import { formatTime } from "@/app/lib/utils";
import useQuizState from "@/app/hooks/useQuizState";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizGenreType } from "@/app/lib/types";
import Spinner from "@/app/components/Spinner";
const QuizQuestion = lazy(() => import("./quizQuestion"));

const QuizPage = () => {
  const currGenre = useSearchParams().get("genre");
  const genreDetails = getGenreDetails(currGenre as QuizGenreType);
  const {
    currentQuestionIndex,
    timeLeft,
    quizData,
    handleSelectAnswer,
    selectedAnswers,
    handlePreviousQuestion,
    handleNextQuestion,
  } = useQuizState(currGenre as QuizGenreType);

  const progress = (currentQuestionIndex / 10) * 100;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full lg:px-80 my-10">
      <span className="flex justify-between items-center w-11/12 mb-5">
        <span className="flex items-center gap-3 text-2xl font-medium">
          {genreDetails?.icon} {`${genreDetails?.title} Quiz`}
        </span>
        <span className="text-2xl self-end font-light">
          Time Left : {formatTime(timeLeft)}
        </span>
      </span>
      <div className="h-1 w-11/12 relative">
        <span
          className=" bg-primary h-full absolute"
          style={{ width: `${progress}%` }}
        ></span>
      </div>
      <Suspense fallback={<Spinner />}>
        <QuizQuestion
          quizData={quizData}
          currentQuestionIndex={currentQuestionIndex}
          handleNextQuestion={handleNextQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          handleSelectAnswer={handleSelectAnswer}
          selectedAnswers={selectedAnswers}
        />
      </Suspense>
    </div>
  );
};

export default QuizPage;
