"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { lazy } from "react";

const UserDropDown = lazy(() => import("./ui/UserDropDown"));

export default function NavBar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <nav className="h-1/12 flex justify-between p-3 items-center mb-10 md:mb-0 dark:shadow-sm dark:shadow-mintGreen shadow-md shadow-night-400">
      <span
        className="flex items-center gap-1"
        onClick={() => {
          pathName !== "/dashboard" && router.push("/dashboard");
        }}
      >
        <Image src={"/logo.svg"} alt="logo" width={70} height={70} />
        <h3 className="text-2xl font-semibold hidden lg:block">QuizMaster</h3>
      </span>

      <UserDropDown />
    </nav>
  );
}
