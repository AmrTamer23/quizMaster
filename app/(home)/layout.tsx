"use client";
import NavBar from "./components/NavBar";
import { userContext } from "@/app/context/UserContext";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = userContext();

  return (
    user && (
      <div className="flex flex-col h-screen">
        <span className="h-1/12">
          <NavBar />
        </span>

        <main className="flex flex-col items-center justify-center h-11/12 md:h-full mt-10 ">
          {children}
        </main>
      </div>
    )
  );
};
export default HomeLayout;
