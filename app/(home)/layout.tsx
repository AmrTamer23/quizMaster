"use client";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { userContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = userContext();

  useEffect(() => {
    if (!user) {
      redirect("/signIn");
    }
  }, [user]);

  return (
    user && (
      <div className="flex flex-col h-screen">
        <NavBar />
        <main className="flex flex-col items-center justify-center h-full">
          {children}
        </main>
      </div>
    )
  );
};
export default HomeLayout;
