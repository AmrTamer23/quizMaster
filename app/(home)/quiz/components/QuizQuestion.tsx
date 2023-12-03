import useQuizState from "@/app/hooks/useQuizState";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizGenreType } from "@/app/lib/types";
import { formatTime } from "@/app/lib/utils";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { FaRegFlag } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import QuizFooter from "./ui/QuizFooter";

const QuizQuestion = () => {
  const currGenre = useSearchParams().get("genre");

  const genreDetails = getGenreDetails(currGenre as QuizGenreType);

  const {
    timeLeft,
    currentQuestionIndex,
    quizData,
    handleSelectAnswer,
    selectedAnswers,
    handlePreviousQuestion,
    handleNextQuestion,
    goToQuestion,
  } = useQuizState(currGenre as QuizGenreType);

  const progress = (currentQuestionIndex / 10) * 100;

  const [isFlagged, setIsFlagged] = useState<boolean[]>([]);

  const handleFlagQuestion = (index: number) => {
    setIsFlagged((prev) => {
      const newState = [...prev];
      newState[index] = !prev[index];
      return newState;
    });
  };

  return (
    <>
      <span className="flex justify-between items-center md:w-11/12 mb-5 gap-5 max-md:mx-2">
        <span className="flex items-center gap-3 text-2xl font-medium">
          {genreDetails?.icon} {`${genreDetails?.title} Quiz`}
        </span>
        <span className="text-lg md:text-2xl md:self-end font-semibold">
          Time Left : {formatTime(timeLeft)}
        </span>
      </span>
      <div className="h-2 w-11/12 relative">
        <span
          className=" bg-primary h-full absolute"
          style={{ width: `${progress}%` }}
        ></span>
      </div>
      <div className="md:h-5/6 h-full w-full dark:bg-dark_green-200 text-white bg-dark_green-500/80 md:shadow-lg dark:shadow-secondary shadow-night-400 rounded-2xl flex flex-col md:px-14 py-8 gap-4">
        <span className="flex flex-col gap-3 px-5 md:px-0">
          <span className="flex justify-between">
            <h5 className="text-secondary text-lg font-light">
              Q {currentQuestionIndex + 1}
            </h5>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    className="text-secondary text-lg font-light"
                    onClick={() => {
                      handleFlagQuestion(currentQuestionIndex);
                    }}
                  >
                    {isFlagged[currentQuestionIndex] ? (
                      <FaFlag />
                    ) : (
                      <FaRegFlag />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-whiteSmoke dark:bg-night-500 text-lg">
                  <div>Flag This Question</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>

          <h2 className="md:text-4xl text-3xl font-semibold">
            {quizData[currentQuestionIndex]?.question}
          </h2>
        </span>

        <section className="mt-5 flex flex-col gap-8 px-5 md:px-0">
          {quizData[currentQuestionIndex]?.incorrect_answers.map(
            (option, index) => (
              <span
                key={index}
                className={clsx(
                  "text-2xl p-2 rounded-lg cursor-pointer",
                  index === selectedAnswers[currentQuestionIndex] &&
                    "bg-myrtle_green-700 text-black"
                )}
                onClick={() => handleSelectAnswer(index)}
              >
                {String.fromCharCode(65 + index)}. {option}
              </span>
            )
          )}
        </section>
        <QuizFooter
          handlePreviousQuestion={handlePreviousQuestion}
          currentQuestionIndex={currentQuestionIndex}
          goToQuestion={goToQuestion}
          handleNextQuestion={handleNextQuestion}
          isFlagged={isFlagged}
        />
      </div>
    </>
  );
};

export default QuizQuestion;
