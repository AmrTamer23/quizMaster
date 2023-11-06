"use client";
import clsx from "clsx";
import { infinity } from "ldrs";
import { useTheme } from "next-themes";

export default function Spinner() {
  const { theme } = useTheme();
  infinity.register();
  return (
    <l-infinity
      size="55"
      stroke="4"
      stroke-length="0.15"
      bg-opacity="0.1"
      speed="1.3"
      color={clsx(theme === "dark" ? "#DEFFF2" : "#0D4045")}
    ></l-infinity>
  );
}
