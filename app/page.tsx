"use client";
import { useEffect } from "react";
import { userAuth } from "./context/UserContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = userAuth();
  useEffect(() => {
    if (!user) {
      redirect("/signIn");
    } else {
      redirect("/dashboard");
    }
  }, [user]);
  return <></>;
}
