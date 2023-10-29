import logo from "@/public/logo.png";
import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <span className="flex gap-5 items-center mb-16">
        <Image
          src={"/logo.png"}
          alt="Trivia Time Logo"
          width={80}
          height={80}
        />
        <h1 className="text-5xl font-semibold">Trivia Time</h1>
      </span>
      {children}
    </section>
  );
}
