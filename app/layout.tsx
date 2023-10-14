import "./globals.css";
import type { Metadata } from "next";
import { Inknut_Antiqua } from "next/font/google";
import { UserContextProvider } from "./context/UserContext";

const inknut = Inknut_Antiqua({
  style: "normal",
  weight: "400",
  display: "swap",
  subsets: ["latin-ext", "devanagari"],
});

export const metadata: Metadata = {
  title: "Trivia Time",
  description: "Simple and fun trivia game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inknut.className}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
