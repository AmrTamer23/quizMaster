import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Spinner() {
  const { theme } = useTheme();
  useEffect(() => {
    async function getSpinner() {
      const { infinity } = await import("ldrs");
      infinity.register();
    }
    getSpinner();
  }, []);
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
