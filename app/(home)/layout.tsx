"use client";
import NavBar from "./components/NavBar";
import { userContext } from "@/app/context/UserContext";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = userContext();

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
