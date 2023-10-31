import { QuizQuestion } from "@/app/lib/types";

const quizQuestion = ({
  quizData,
  currentQuestionIndex,
  handleSelectAnswer,
  selectedAnswers,
  handlePreviousQuestion,
  handleNextQuestion,
}: {
  quizData: QuizQuestion[];
  currentQuestionIndex: number;
  handleSelectAnswer: (index: number) => void;
  selectedAnswers: number[];
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
}) => {
  return (
    <div className="h-3/5 w-full shadow-lg shadow-secondary rounded-2xl flex flex-col px-14 py-8 gap-4">
      <h5 className="text-secondary">Q{currentQuestionIndex + 1}</h5>

      <h2 className="text-3xl font-semibold">
        {quizData[currentQuestionIndex]?.question}
      </h2>

      <section className="mt-5 flex flex-col gap-5">
        {quizData[currentQuestionIndex]?.incorrect_answers.map(
          (option, index) => (
            <span
              key={index}
              className={`text-lg p-2 rounded-lg cursor-pointer ${
                index === selectedAnswers[currentQuestionIndex]
                  ? "bg-accent "
                  : ""
              }}`}
              onClick={() => handleSelectAnswer(index)}
            >
              {String.fromCharCode(65 + index)}. {option}
            </span>
          )
        )}
      </section>
      <span className="flex justify-between items-end h-full">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-600 rounded-lg px-10 py-2 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous Question
        </button>
        <button
          onClick={handleNextQuestion}
          className={`${
            currentQuestionIndex === quizData.length - 1
              ? "bg-primary"
              : "bg-emerald-500"
          } rounded-lg px-10 py-2`}
        >
          {currentQuestionIndex === quizData.length - 1
            ? "Submit"
            : "Next Question"}
        </button>
      </span>
    </div>
  );
};

export default quizQuestion;
