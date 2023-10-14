import { doc, setDoc, getDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const useFirestore = () => {
  const initUserPoints = async (uid: any) => {
    try {
      const docRef = doc(collection(db, "users"), uid);
      await setDoc(docRef, {
        userId: uid,
        points: 0,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getUserPoints = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
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

  return {
    initUserPoints,
    getUserPoints,
    updateUserPoints,
    isDocExists,
  };
};

export default useFirestore;
