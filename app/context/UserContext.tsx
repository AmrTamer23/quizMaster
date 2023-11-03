"use client";
import { useContext, createContext, useState, useEffect, useMemo } from "react";
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
  updatePoints: (points: number) => {},
  signUp: () => Promise.resolve(""),
  signInWithPassword: () => Promise.resolve(false),
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

  useEffect(() => {
    if (user) {
      getUserDetails(user.uid).then((res: any) => {
        setUserDetails(res);
      });
    }
  }, [user]);

  const updatePoints = (points: number) => {
    points = points + userDetails.points;
    updateUserPoints(user.uid, points);
    setUserDetails((prev) => ({ ...prev, points }));
  };

  const value = useMemo(
    () => ({
      user,
      userDetails,
      updatePoints,
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
