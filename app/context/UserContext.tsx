"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { DocumentData } from "firebase/firestore/lite";
import { UserContextType } from "../utils/types";
import useAuth from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";

const UserContext = createContext<UserContextType>({
  user: null,
  userPoints: 0,
  updateUserPoints: () => {},
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
  const { signUp, signInWithPassword, googleSignIn, logOut } = useAuth({
    user,
    setUser,
  });
  const { getUserPoints, updateUserPoints } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserPoints(user.uid).then(
          (data: null | undefined | DocumentData) => {
            if (data) setUserPoints(data.points);
          }
        );
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
        updateUserPoints,
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
