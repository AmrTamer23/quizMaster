"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdKeyboardArrowDown } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import { userContext } from "@/app/context/UserContext";

export default function UserDropDown({}: {}) {
  const { user, userDetails, logOut } = userContext();
  const [points, setPoints] = useState(userDetails.points);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setPoints(userDetails.points);
  }, [userDetails.points]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <span className="flex gap-3 items-center hover:cursor-pointer relative">
            {user && (
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
            )}
            <h3 className="text-xl font-medium">
              {user.displayName ? user.displayName : userDetails.userName}
            </h3>
            <MdKeyboardArrowDown size={35} />
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-myrtle_green-200 dark:text-whiteSmoke shadow-sm dark:shadow-whiteSmoke shadow-night-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <span
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={
                  "block px-4 py-2 text-lg font-semibold cursor-pointer  hover:dark:bg-myrtle_green-400 hover:bg-gray-100"
                }
              >
                Points: {points ? points : 0}
              </span>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTheme(isDark ? "light" : "dark");
                }}
                className={
                  "px-4 py-2 text-lg  cursor-pointer w-full flex justify-between items-center hover:dark:bg-myrtle_green-400 hover:bg-gray-100"
                }
              >
                {isDark ? "Dark Mode" : "Light Mode"}
                {isDark ? <MdDarkMode size={25} /> : <IoSunnySharp size={25} />}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={logOut}
                className="block w-full px-4 py-2 text-left text-lg dark:bg-red-950 hover:dark:bg-red-800 bg-red-100 hover:bg-red-300"
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
