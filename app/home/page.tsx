"use client";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { userAuth } from "@/app/context/UserContext";
import { redirect } from "next/navigation";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FiCpu } from "react-icons/fi";
import { IoBasketballOutline } from "react-icons/io5";
import { MdOutlineHistoryEdu } from "react-icons/md";

const HomeLayout = () => {
  const { user } = userAuth();

  useEffect(() => {
    if (!user) {
      redirect("/signIn");
    }
  }, [user]);

  const quizGenres = [
    {
      title: "Geography",
      icon: <GiEarthAfricaEurope size={70} />,
    },
    {
      title: "Computer Science",
      icon: <FiCpu size={60} />,
    },
    {
      title: "History",
      icon: <MdOutlineHistoryEdu size={70} />,
    },
    {
      title: "Sports",
      icon: <IoBasketballOutline size={80} />,
    },
  ];
  return (
    user && (
      <div className="flex flex-col h-screen">
        <NavBar />
        <main className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl lg:text-5xl font-medium h-1/5 flex items-end my-9">
            Start a New Quiz
          </h1>
          <div className="grid grid-col-1 lg:grid-cols-2 gap-5  w-full h-full lg:px-72 lg:mb-16 group-odd:self-start">
            {quizGenres.map((genre) => (
              <div className="item bg-zinc-300 hover:bg-secondary cursor-pointer rounded-3xl flex flex-col gap-2 justify-center items-center lg:h-4/5 w-4/5 place-self-center py-7 ">
                {genre.icon}
                <h4 className="text-cText text-2xl">{genre.title}</h4>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  );
};
export default HomeLayout;
