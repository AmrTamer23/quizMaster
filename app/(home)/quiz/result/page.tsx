"use client";
import { Suspense, lazy } from "react";
import Loading from "../loading";
const QuizResult = lazy(() => import("./QuizResult"));

const Result = () => {
  return (
    <Suspense fallback={<Loading />}>
      <QuizResult />
    </Suspense>
  );
};

export default Result;
