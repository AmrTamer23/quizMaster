import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import useFirestore from "./useFirestore";
import { Dispatch } from "react";

const useAuth = ({
  user,
  setUser,
}: {
  user: any;
  setUser: Dispatch<any>;
}) => {
  const { initUserPoints, updateUserPoints, isDocExists } = useFirestore();

  const signUp = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          initUserPoints(userCredential.user.uid);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("User ID:", result.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });

    if (user && !isDocExists(user.uid)) {
      initUserPoints(user.uid);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    signUp,
    signInWithPassword,
    googleSignIn,
    logOut,
    updateUserPoints,
  };
};
export default useAuth;
