"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { DocumentData } from "firebase/firestore/lite";

type UserContextType = {
  user: any;
  userPoints: number;
  signUp: (email: string, password: string) => void;
  signInWithPassword: (email: string, password: string) => void;
  googleSignIn: () => void;
  logOut: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  userPoints: 0,
  signUp: () => {},
  signInWithPassword: () => {},
  googleSignIn: () => {},
  logOut: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [userPoints, setUserPoints] = useState<number>(0);

  const initUserPoints = async (uid: any) => {
    try {
      const docRef = doc(collection(db, "users"), uid);
      await setDoc(docRef, {
        userId: uid,
        points: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getUserPoints = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      initUserPoints(uid);
    }
  };

  const updateUserPoints = async (uid: string, points: number) => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      points: points,
    });
  };

  const isDocExists = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const signUp = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
    initUserPoints(user.uid);
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

    if (!isDocExists(user.uid)) {
      console.log("User document does not exist, initializing...");
      initUserPoints(user.uid);
    } else {
      console.log("User document exists, retrieving user points...");
      getUserPoints(user.uid).then((data: null | undefined | DocumentData) => {
        if (data !== null && data !== undefined) {
          setUserPoints(data.points);
        }
      });
    }
    updateUserPoints(user.uid, 50);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserPoints(user.uid).then((data: any) => {
          setUserPoints(data.points);
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        userPoints,
        signUp,
        signInWithPassword,
        googleSignIn,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(UserContext);
};
