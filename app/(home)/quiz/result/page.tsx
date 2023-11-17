"use client";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";

const QuizResult = dynamic(() => import("./QuizResult"), {
  loading: () => <Spinner />,
});

const Result = () => {
  return <QuizResult />;
};

export default Result;
