"use client";
import { userContext } from "@/app/context/UserContext";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserDropDownMenu from "./ui/UserDropDown";

export default function NavBar() {
  const { user, userDetails, logOut } = userContext();

  return (
    <nav className="flex justify-between p-3 items-center shadow-zinc-100 shadow-sm">
      <span className="flex items-center gap-3">
        <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
        <h3 className="text-2xl font-medium hidden lg:block">QuizzyLantern</h3>
      </span>

      <UserDropDownMenu
        logOut={logOut}
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
            <h3 className="text-lg font-medium">
              {user.displayName ? user.displayName : userDetails.userName}
            </h3>
            <MdKeyboardArrowDown size={25} />
          </span>
        }
      />
    </nav>
  );
}
