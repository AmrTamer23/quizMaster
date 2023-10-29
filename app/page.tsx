"use client";
import { useEffect } from "react";
import { userContext } from "./context/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = userContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/signIn");
    } else {
      router.push("/dashboard");
    }
  }, [user]);
  return <></>;
}
