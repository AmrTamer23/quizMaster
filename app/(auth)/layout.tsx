import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <span className="flex flex-col gap-2 items-center mb-8">
        <Image
          src={"/logo.svg"}
          alt="QuizMaster Logo"
          width={200}
          height={200}
        />
        <h1 className="text-5xl font-sans font-semibold ">QuizMaster</h1>
      </span>
      {children}
    </section>
  );
}
