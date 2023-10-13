import AuthLayout from "./(auth)/layout";
import SignIn from "./(auth)/signIn/page";

export default function Home() {
  return (
    <main>
      <AuthLayout children={<SignIn />} />
    </main>
  );
}
