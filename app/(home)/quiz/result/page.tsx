"use client";
import { userContext } from "@/app/context/UserContext";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizCategorieType } from "@/app/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Result = () => {
  const { userDetails } = userContext();
  const quizData = sessionStorage.getItem("quizResult");
  let data: { score: number; genre: string } = { score: 0, genre: "" };
  if (quizData) {
    data = JSON.parse(quizData);
  }
  const genreDetails = getGenreDetails(data.genre as QuizCategorieType);

  const passed: boolean = data.score > 5 ? true : false;

  const router = useRouter();

  const routeToQuiz = (category: string = data.genre) => {
    const pathname = `/quiz?category=${category}`;
    router.push(pathname);
  };

  return (
    <div
      className={`h-4/5 w-3/6 border-4 ${
        passed
          ? " border-primary shadow-emerald-500 shadow-lg"
          : "border-red-800  shadow-red-500 shadow-lg"
      } drop-shadow-lg rounded-2xl flex flex-col items-center justify-between p-14 gap-8`}
    >
      <span className="flex flex-col items-center gap-5">
        {data.score > 5 ? (
          <>
            <h1 className="text-5xl">Congratulations !</h1>
            <h2 className="text-2xl text-cText">
              You got {data.score} out of 10 Points
            </h2>
            <h3 className="text-xl text-cText">
              Your Total Score is {userDetails.points}
            </h3>
          </>
        ) : (
          <>
            <h1 className="text-5xl">Oops !</h1>
            <h2 className="text-3xl text-cText">
              You got {data.score} out of 10 Points
            </h2>
            <h4 className="text-lg text-gray-400">
              Note: Your score won't update until you pass.
            </h4>
          </>
        )}
      </span>
      <span className="flex flex-col items-center gap-5">
        <button
          className="rounded-lg px-10 py-3 text-black bg-secondary text-lg font-medium"
          onClick={() => routeToQuiz()}
        >
          {passed
            ? `Take another Quiz about ${genreDetails?.title}`
            : `Try again in ${genreDetails?.title}`}
        </button>
        <Link href={"/dashboard"}>
          <p className="text-lg underline cursor-pointer">Back To Dashboard</p>
        </Link>
      </span>
    </div>
  );
};

export default Result;
