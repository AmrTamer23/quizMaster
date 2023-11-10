"use client";
import { Suspense, lazy } from "react";
import Spinner from "@/app/components/Spinner";
const QuizQuestion = lazy(() => import("./QuizQuestion"));

const QuizPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full lg:px-80 my-10">
      <Suspense fallback={<Spinner />}>
        <QuizQuestion />
      </Suspense>
    </div>
  );
};

export default QuizPage;
