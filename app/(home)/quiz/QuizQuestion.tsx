import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import useQuizState from "@/app/hooks/useQuizState";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizGenreType } from "@/app/lib/types";
import { formatTime } from "@/app/lib/utils";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

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
          <h5 className="text-secondary text-lg font-light">
            Q {currentQuestionIndex + 1}
          </h5>

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
        <span className="flex justify-between items-end h-full mt-10 md:mt-0 gap-3">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-gray-700 rounded-lg md:px-10 px-2 py-2 text-white disabled:cursor-not-allowed border-2 border-myrtle_green-900"
                >
                  Previous Question
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-night-500">
                <div className="flex gap-5">
                  {[...Array(10)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={clsx(
                        "rounded-full w-8 h-8 border-2 border-myrtle_green-900",
                        index === currentQuestionIndex
                          ? "bg-myrtle_green-700 text-black"
                          : "bg-night-500 text-white"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <button
            onClick={handleNextQuestion}
            className={clsx(
              "rounded-lg px-10 py-2 border-2 border-myrtle_green-900",
              currentQuestionIndex === quizData.length - 1
                ? "bg-primary"
                : "bg-myrtle_green-400 text-whiteSmoke"
            )}
          >
            {currentQuestionIndex === quizData.length - 1
              ? "Submit"
              : "Next Question"}
          </button>
        </span>
      </div>
    </>
  );
};

export default QuizQuestion;
