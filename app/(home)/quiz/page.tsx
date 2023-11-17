"use client";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";

const QuizQuestion = dynamic(() => import("./QuizQuestion"), {
  loading: () => <Spinner />,
});

const QuizPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full lg:px-80 my-10">
      <QuizQuestion />
    </div>
  );
};

export default QuizPage;
