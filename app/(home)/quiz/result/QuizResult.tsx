import { userContext } from "@/app/context/UserContext";
import useSessionStorage from "@/app/hooks/useSessionStorage";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizGenreType } from "@/app/lib/types";
import clsx from "clsx";
import Link from "next/link";

const QuizResult = () => {
  const { userDetails } = userContext();
  const data = useSessionStorage().getResult();
  const genreDetails = getGenreDetails(data.genre as QuizGenreType);
  const passed: boolean = data.score > 5 ? true : false;

  return (
    <div
      className={clsx(
        "md:h-4/5 min-h-[70dvh] md:w-3/6 border-4 drop-shadow-lg rounded-2xl flex flex-col items-center justify-between md:p-14 py-8 px-5 gap-8 dark:bg-inherit",
        passed
          ? " border-primary shadow-emerald-500 shadow-lg bg-emerald-50"
          : "border-red-800  shadow-red-500 shadow-lg bg-red-50"
      )}
    >
      <span className="flex flex-col items-center gap-5">
        {data.score > 5 ? (
          <>
            <h1 className="md:text-5xl text-4xl">Congratulations !</h1>
            <h2 className="md:text-3xl text-xl text-cText">
              You got {data.score} out of 10 Points
            </h2>
            <h3 className="text-xl text-cText">
              Your Total Score is {userDetails.points}
            </h3>
          </>
        ) : (
          <>
            <h1 className="text-5xl">Oops !</h1>
            <h2 className="md:text-3xl text-xl text-cText">
              You got {data.score} out of 10 Points
            </h2>
            <h4 className="md:text-lg text-sm dark:text-gray-400 text-gray-600">
              Note: Your score won't update until you pass.
            </h4>
          </>
        )}
      </span>
      <span className="flex flex-col items-center gap-5">
        <Link href={`/quiz?genre=${data.genre}`}>
          <button className="rounded-lg md:px-10 px-4 py-3 dark:text-black dark:bg-secondary bg-myrtle_green-500 text-whiteSmoke md:text-lg font-medium">
            {passed
              ? `Take another Quiz about ${genreDetails?.title}`
              : `Try again in ${genreDetails?.title}`}
          </button>
        </Link>

        <Link href={"/dashboard"}>
          <p className="text-lg underline cursor-pointer">Back To Dashboard</p>
        </Link>
      </span>
    </div>
  );
};

export default QuizResult;
