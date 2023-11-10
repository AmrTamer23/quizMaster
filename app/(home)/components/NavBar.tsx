"use client";
import { userContext } from "@/app/context/UserContext";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserDropDownMenu from "./ui/UserDropDown";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export default function NavBar() {
  const { user, userDetails, logOut } = userContext();
  const router = useRouter();
  const pathName = usePathname();
  const [points, setPoints] = useState(userDetails.points);
  const { theme } = useTheme();

  useEffect(() => {
    setPoints(userDetails.points);
  }, [userDetails.points]);

  return (
    <nav
      className={clsx(
        "flex justify-between p-3 items-center mb-10 md:mb-0",
        theme === "dark"
          ? "shadow-sm shadow-mintGreen"
          : "shadow-md shadow-night-400"
      )}
    >
      <span
        className="flex items-center gap-1"
        onClick={() => {
          pathName !== "/dashboard" && router.push("/dashboard");
        }}
      >
        <Image src={"/logo.svg"} alt="logo" width={70} height={70} />
        <h3 className="text-2xl font-semibold hidden lg:block">QuizMaster</h3>
      </span>

      <UserDropDownMenu
        logOut={logOut}
        points={points}
        children={
          <span className="flex gap-3 items-center hover:cursor-pointer relative">
            <Image
              src={
                user.photoURL
                  ? user.photoURL
                  : `https://ui-avatars.com/api/?name=${userDetails.userName}&background=random&color=fff`
              }
              alt="Avatar"
              width={40}
              height={10}
              className="rounded-full h-fit bg-black "
            />
            <h3 className="text-xl font-medium">
              {user.displayName ? user.displayName : userDetails.userName}
            </h3>
            <MdKeyboardArrowDown size={35} />
          </span>
        }
      />
    </nav>
  );
}
