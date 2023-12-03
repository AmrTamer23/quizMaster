"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";

const QuizQuestion = dynamic(() => import("./components/QuizQuestion"), {
  loading: () => (
    <Skeleton
      height={"70vh"}
      width={"70vw"}
      baseColor="#000c06"
      highlightColor="#525252"
    />
  ),
});

const QuizPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full lg:px-80 my-10">
      <QuizQuestion />
    </div>
  );
};

export default QuizPage;
