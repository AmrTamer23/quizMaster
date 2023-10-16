import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword ,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import useFirestore from "./useFirestore";
import { Dispatch } from "react";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';


const useAuth = ({
  user,
  setUser,
}: {
  user: any;
  setUser: Dispatch<any>;
}) => {
  const { initUserPoints, updateUserPoints,setUsername, isDocExists } = useFirestore();

  const router = useRouter();
 
  const signUp = async (email: string, password: string, userName: string): Promise<string> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      if (userCredential.user) {
        await setUsername(userCredential.user.uid, userName);
        await initUserPoints(userCredential.user.uid);
        return 'success';
      }
     return 'Something went wrong!';
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((result) => {
        setUser(result.user);
      })
      
    } catch (error) {
      console.log(error);
    }

    if (user && !isDocExists(user.uid)) {
      initUserPoints(user.uid);
    }
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

  const logOut = async() => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/signIn");
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
