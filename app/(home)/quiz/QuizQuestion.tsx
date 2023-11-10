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
  } = useQuizState(currGenre as QuizGenreType);

  const progress = (currentQuestionIndex / 10) * 100;

  return (
    <>
      <span className="flex justify-between items-center w-11/12 mb-5">
        <span className="flex items-center gap-3 text-2xl font-medium">
          {genreDetails?.icon} {`${genreDetails?.title} Quiz`}
        </span>
        <span className="text-2xl self-end font-light">
          Time Left : {formatTime(timeLeft)}
        </span>
      </span>
      <div className="h-2 w-11/12 relative">
        <span
          className=" bg-primary h-full absolute"
          style={{ width: `${progress}%` }}
        ></span>
      </div>
      <div className="md:h-5/6  h-full w-full dark:bg-dark_green-200 text-white bg-dark_green-500/80 md:shadow-lg dark:shadow-secondary shadow-night-400 rounded-2xl flex flex-col px-14 py-8 gap-4">
        <h5 className="text-secondary text-lg font-light">
          Q {currentQuestionIndex + 1}
        </h5>

        <h2 className="md:text-4xl text-3xl font-semibold">
          {quizData[currentQuestionIndex]?.question}
        </h2>

        <section className="mt-5 flex flex-col gap-8">
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
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-700 rounded-lg px-10 py-2 text-white disabled:cursor-not-allowed border-2 border-myrtle_green-900"
          >
            Previous Question
          </button>
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
