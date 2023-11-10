import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import Providers from "./providers";

export const metadata: Metadata = {
  icons: "./logo.svg",
  title: "QuizMaster",
  description: "Simple and fun trivia game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased  select-none dark:bg-night-200 dark:text-whiteSmoke bg-mintGreen text-black bg-opacity-5`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
