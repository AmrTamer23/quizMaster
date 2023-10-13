import logo from "@/assets/logo.png";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <span className="flex gap-5 items-center mb-16">
        <img src={logo.src} alt="Trivia Time Logo" width={80} height={80} />
        <h1 className="text-5xl font-semibold">Trivia Time</h1>
      </span>
      {children}
    </section>
  );
}
