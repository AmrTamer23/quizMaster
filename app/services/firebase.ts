import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp-9SKwsyh7VhUOWmDC9DwU1lRfxzwytQ",
  authDomain: "trivia-time-722d2.firebaseapp.com",
  projectId: "trivia-time-722d2",
  storageBucket: "trivia-time-722d2.appspot.com",
  messagingSenderId: "40302137249",
  appId: "1:40302137249:web:1962fefcb856c6ff3245e0",
  measurementId: "G-YG51H5ELPY",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
