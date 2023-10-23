"use client";
import { useEffect } from "react";
import { userContext } from "./context/UserContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = userContext();
  useEffect(() => {
    if (!user) {
      redirect("/signIn");
    } else {
      redirect("/dashboard");
    }
  }, [user]);
  return <></>;
}
