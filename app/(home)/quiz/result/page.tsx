"use client";
import { userContext } from "@/app/context/UserContext";
import getGenreDetails from "@/app/lib/getGenreDetails";
import { QuizCategorieType } from "@/app/lib/types";
import Link from "next/link";

const Result = () => {
  const { user, userDetails, updateUserDetails } = userContext();
  const quizData = sessionStorage.getItem("quizResult");
  let data: { score: number; genre: string } = { score: 0, genre: "" };
  if (quizData) {
    data = JSON.parse(quizData);
  }
  const genreDetails = getGenreDetails(data.genre as QuizCategorieType);

  const passed: boolean = data.score > 5 ? true : false;

  console.log(quizData);

  return (
    <div
      className={`h-3/5 w-4/6  border-4 ${
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
              Your Total Score is {userDetails.points + data.score}
            </h3>
          </>
        ) : (
          <>
            <h1 className="text-4xl">Oops !</h1>
            <h2 className="text-2xl text-cText">
              You got {data.score} out of 10 Points
            </h2>
            <h4 className="text-sm text-gray-400">
              Note: Your score won't update until you pass.
            </h4>
          </>
        )}
      </span>
      <span className="flex flex-col items-center gap-5">
        {passed ? (
          <button className=" rounded-lg px-10 py-3 text-black font-medium bg-secondary">
            Take another Quiz about {genreDetails?.title}
          </button>
        ) : (
          <button className=" rounded-lg px-10 py-3 text-black bg-secondary">
            Try again in {genreDetails?.title}
          </button>
        )}
        <Link href={"/dashboard"}>
          <p className="text-base underline cursor-pointer">
            Back To Dashboard
          </p>
        </Link>
      </span>
    </div>
  );
};

export default Result;
