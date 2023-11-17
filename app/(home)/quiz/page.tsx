"use client";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import { Suspense, lazy } from "react";

const QuizQuestion = lazy(() => import("./QuizQuestion"));

const QuizPage = () => {
  return (
    <Suspense fallback={<Skeleton containerClassName="flex-1" />}>
      <div className="flex flex-col justify-center items-center w-full h-full lg:px-80 my-10">
        <QuizQuestion />
      </div>
    </Suspense>
  );
};

export default QuizPage;
