"use client";
import { ReactNode, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import clsx from "clsx";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDropDown({
  children,
  logOut,
  points,
}: {
  children: ReactNode;
  logOut: () => void;
  points: number;
}) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>{children}</Menu.Button>
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
              {({ active }) => (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={classNames(
                    active
                      ? clsx(isDark ? "bg-myrtle_green-400" : "bg-gray-100")
                      : "",
                    "block px-4 py-2 text-lg font-medium cursor-pointer"
                  )}
                >
                  Points: {points}
                </span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTheme(isDark ? "light" : "dark");
                  }}
                  className={classNames(
                    active
                      ? clsx(isDark ? "bg-myrtle_green-400" : "bg-gray-100")
                      : "",
                    "px-4 py-2 text-lg font-medium cursor-pointer w-full flex justify-between items-center"
                  )}
                >
                  {isDark ? "Dark Mode" : "Light Mode"}
                  {isDark ? (
                    <MdDarkMode size={25} />
                  ) : (
                    <IoSunnySharp size={25} />
                  )}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logOut}
                  className={classNames(
                    active ? clsx(isDark ? "bg-red-800" : "bg-red-200") : "",
                    clsx(
                      "block w-full px-4 py-2 text-left text-lg ",
                      isDark ? "bg-red-950" : "bg-red-100"
                    )
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
