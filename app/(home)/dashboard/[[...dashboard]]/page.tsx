"use client";
import { FiCpu } from "react-icons/fi";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { IoBasketballOutline } from "react-icons/io5";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();

  const routeToQuiz = (genre: string) => {
    const pathname = `/quiz?genre=${genre}`;
    router.push(pathname);
  };
  const quizGenres = [
    {
      title: "Geography",
      icon: <GiEarthAfricaEurope size={70} color={"black"} />,
      onclick: () => routeToQuiz("geo"),
    },
    {
      title: "Computer Science",
      icon: <FiCpu size={60} color={"black"} />,
      onclick: () => routeToQuiz("cs"),
    },
    {
      title: "History",
      icon: <MdOutlineHistoryEdu size={70} color={"black"} />,
      onclick: () => routeToQuiz("history"),
    },
    {
      title: "Sports",
      icon: <IoBasketballOutline size={80} color={"black"} />,
      onclick: () => routeToQuiz("sports"),
    },
  ];
  return (
    <>
      <h1 className="text-3xl lg:text-6xl  h-1/5 flex items-end my-5">
        Start a New Quiz
      </h1>
      <div className="grid grid-col-1 lg:grid-cols-2 gap-5  w-full h-full lg:px-72 lg:mb-16 my-4">
        {quizGenres.map((genre) => (
          <div
            key={genre.title}
            onClick={genre.onclick}
            className="item  bg-cambridge_blue hover:bg-myrtle_green-900 cursor-pointer rounded-3xl flex flex-col gap-2 justify-center items-center lg:h-4/5 w-3/6 place-self-center py-7 "
          >
            {genre.icon}
            <h4 className="text-black text-2xl font-semibold text-center px-2">
              {genre.title}
            </h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
