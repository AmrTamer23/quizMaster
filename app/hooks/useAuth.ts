import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import useFirestore from "./useFirestore";
import { Dispatch, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { DocumentData } from "firebase/firestore";

const useAuth = ({ user, setUser }: { user: any; setUser: Dispatch<any> }) => {
  const { initUserPoints, updateUserPoints, setUsername, isDocExists } =
    useFirestore();

  const router = useRouter();

  const signUp = async (
    email: string,
    password: string,
    userName: string
  ): Promise<string> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        await setUsername(userCredential.user.uid, userName);
        await initUserPoints(userCredential.user.uid);
        return "success";
      }
      return "Something went wrong!";
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((result) => {
        setUser(result.user);
      });
      Cookies.set("loggedIn", "true");
      if (user && !isDocExists(user.uid)) {
        initUserPoints(user.uid);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      if (user) {
        if (!(await isDocExists(user.uid))) {
          await initUserPoints(user.uid);
        }

        Cookies.set("loggedIn", "true");
        return true;
      } else {
        console.error("User information not available.");
        return false;
      }
    } catch (error) {
      console.error("An error occurred during Google Sign-In:", error);
      return false;
    }
  };
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        Cookies.remove("loggedIn");
        router.push("/signIn");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        Cookies.set("loggedIn", "true");
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [user]);

  return {
    signUp,
    signInWithPassword,
    googleSignIn,
    logOut,
    updateUserPoints,
  };
};
export default useAuth;
