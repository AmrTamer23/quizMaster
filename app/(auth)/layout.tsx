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
          src={"/logo.svg"}
          alt="QuizzyLantern Logo"
          width={90}
          height={90}
        />
        <h1 className="text-5xl font-sans font-semibold ">QuizzyLantern</h1>
      </span>
      {children}
    </section>
  );
}
