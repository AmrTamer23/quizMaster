import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  DocumentData,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { QuizGenreType } from "../lib/types";

const useFirestore = () => {
  const setUsername = async (uid: string, username: string) => {
    const docRef = doc(collection(db, "users"), uid);
    await setDoc(
      docRef,
      {
        userName: username,
      },
      { merge: true }
    );
  };

  const getUserDetails = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  };

  const initUserPoints = async (uid: any) => {
    try {
      const docRef = doc(collection(db, "users"), uid);
      await updateDoc(docRef, {
        userId: uid,
        points: 0,
        pointsByGenre: {
          cs: 0,
          geo: 0,
          history: 0,
          sports: 0,
        },
      });
      console.log("Document added successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const initUserPointsWGoogle = async (uid: any) => {
    try {
      const docRef = doc(collection(db, "users"), uid);
      await setDoc(docRef, {
        userId: uid,
        points: 0,
        pointsByGenre: {
          cs: 0,
          geo: 0,
          history: 0,
          sports: 0,
        },
      });
      console.log("Document added successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateUserPoints = async (
    uid: string,
    totalPoints: number,
    genre: QuizGenreType,
    points: number
  ) => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      points: totalPoints,
      [`pointsByGenre.${genre}`]: points,
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

  return {
    initUserPoints,
    initUserPointsWGoogle,
    setUsername,
    getUserDetails,
    updateUserPoints,
    isDocExists,
  };
};

export default useFirestore;
