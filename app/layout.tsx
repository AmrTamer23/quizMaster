import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { UserContextProvider } from "./context/UserContext";

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuizzyLantern",
  description: "Simple and fun trivia game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.className} antialiased `}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
