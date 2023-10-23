"use client";
import { userContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const Result = () => {
  const router = useRouter();
  const { userDetails } = userContext();
  const quizData = sessionStorage.getItem("quizResult");
  let data: { score: number; genre: string } = { score: 0, genre: "" };
  if (quizData) {
    data = JSON.parse(quizData);
  }

  const passed: boolean = data.score > 5 ? true : false;

  return (
    <div
      className={`h-3/5 w-3/6 bg-gray-200 border-4 ${
        passed ? " border-secondary" : "border-red-700"
      } drop-shadow-lg rounded-2xl flex flex-col items-center justify-between p-14 gap-8`}
    >
      <span className="flex flex-col items-center gap-5">
        {data.score > 5 ? (
          <>
            <h1 className="text-4xl">Congratulations !</h1>
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
            <h4 className="text-sm text-cText">
              Note: Your score won't update until you pass.
            </h4>
          </>
        )}
      </span>
      <span className="flex flex-col items-center gap-5">
        {passed ? (
          <button className=" rounded-lg px-10 py-3 text-white bg-secondary">
            Take another Quiz about {data.genre}
          </button>
        ) : (
          <button className=" rounded-lg px-10 py-3 text-white bg-slate-800">
            Try again in {data.genre}
          </button>
        )}
        <p
          className="text-base underline cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Back To Dashboard
        </p>
      </span>
    </div>
  );
};

export default Result;
