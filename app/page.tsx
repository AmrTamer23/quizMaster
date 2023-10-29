import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Home() {
  const isLogged = Cookies.get("loggedIn");
  return isLogged ? redirect("/dashboard") : redirect("/signIn");
}
