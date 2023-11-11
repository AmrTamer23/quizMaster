"use client";
import { UserContextProvider } from "./context/UserContext";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <UserContextProvider>{children}</UserContextProvider>
    </ThemeProvider>
  );
}
