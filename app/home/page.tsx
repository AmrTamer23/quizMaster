"use client";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { userAuth } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const HomeLayout = () => {
  const { user } = userAuth();

  useEffect(() => {
    if (!user) {
      redirect("/signIn");
    }
  }, [user]);
  return (
    user && (
      <div className="flex flex-col">
        <NavBar />
      </div>
    )
  );
};
export default HomeLayout;
