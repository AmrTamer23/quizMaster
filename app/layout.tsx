import "./globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { UserContextProvider } from "./context/UserContext";

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
      <body className={`${GeistSans.className} antialiased  select-none`}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
