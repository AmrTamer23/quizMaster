"use client";
import { useContext, createContext, useState, useEffect, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { DocumentData } from "firebase/firestore/lite";
import { UserContextType, userDetailsType } from "../lib/types";
import useAuth from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";

const UserContext = createContext<UserContextType>({
  user: null,
  userDetails: {
    name: "",
    points: 0,
    userName: "",
  },
  updateUserPoints: () => {},
  updateUserDetails: () => {},
  signUp: () => Promise.resolve(""),
  signInWithPassword: () => Promise.resolve(),
  googleSignIn: () => Promise.resolve(),
  logOut: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    name: "",
    points: 0,
    userName: "",
  });
  const { signUp, signInWithPassword, googleSignIn, logOut } = useAuth({
    user,
    setUser,
  });
  const { getUserDetails, updateUserPoints } = useFirestore();

  const updateUserDetails = async () => {
    getUserDetails(user.uid).then((data: DocumentData | false) => {
      if (data !== false) {
        setUserDetails(data as userDetailsType);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserDetails(user.uid).then((data: DocumentData | false) => {
          if (data !== false) {
            setUserDetails(data as userDetailsType);
          }
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      userDetails,
      updateUserPoints,
      updateUserDetails,
      signUp,
      signInWithPassword,
      googleSignIn,
      logOut,
    }),
    [user, userDetails]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const userContext = () => {
  return useContext(UserContext);
};
