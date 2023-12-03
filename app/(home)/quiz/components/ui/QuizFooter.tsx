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
import { Button } from "@/app/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import useQuizState from "@/app/hooks/useQuizState";
import clsx from "clsx";

export default function QuizFooter({
  handlePreviousQuestion,
  currentQuestionIndex,
  goToQuestion,
  handleNextQuestion,

  isFlagged,
}: {
  handlePreviousQuestion: () => void;
  currentQuestionIndex: number;
  goToQuestion: (index: number) => void;
  handleNextQuestion: () => void;
  isFlagged: boolean[];
}) {
  return (
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
          <TooltipContent className="bg-whiteSmoke dark:bg-night-500">
            <div className="grid grid-cols-4 gap-5 py-4">
              {[...Array(10)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={clsx(
                    "rounded-full w-8 h-8 border-2 border-myrtle_green-600",
                    index === currentQuestionIndex
                      ? "bg-myrtle_green-700 text-black"
                      : isFlagged[index]
                      ? "bg-red-500 text-white"
                      : "bg-whiteSmoke dark:bg-night-500 dark:text-white"
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isFlagged.includes(true) && currentQuestionIndex === 9 ? (
        <AlertDialog>
          <AlertDialogTrigger>
            <button
              onClick={() => {}}
              className="rounded-lg px-10 py-2 border-2 border-myrtle_green-900 bg-myrtle_green-400 text-whiteSmoke"
            >
              Submit
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-whiteSmoke dark:bg-night-500 p-5">
            <AlertDialogHeader>
              <AlertDialogTitle>Do You Really Want to Submit?</AlertDialogTitle>
              <AlertDialogDescription>
                You Flagged Questions
                {isFlagged.map(
                  (_, index) => isFlagged[index] && `${index + 1}, `
                )}
                and you will not be able to go back to them.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="p-0 m-0">
                <Button className="border-[0.1em] bg-whiteSmoke border-black-300">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleNextQuestion}
                className="p-0 m-0"
              >
                <Button
                  variant={"destructive"}
                  className="border-[0.1em] border-red-300"
                >
                  Submit
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <button
          onClick={handleNextQuestion}
          className={clsx(
            "rounded-lg px-10 py-2 border-2 border-myrtle_green-900",
            currentQuestionIndex === 9
              ? "bg-primary"
              : "bg-myrtle_green-400 text-whiteSmoke"
          )}
        >
          {currentQuestionIndex === 9 ? "Submit" : "Next Question"}
        </button>
      )}
    </span>
  );
}
