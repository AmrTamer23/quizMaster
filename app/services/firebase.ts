// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp-9SKwsyh7VhUOWmDC9DwU1lRfxzwytQ",
  authDomain: "trivia-time-722d2.firebaseapp.com",
  projectId: "trivia-time-722d2",
  storageBucket: "trivia-time-722d2.appspot.com",
  messagingSenderId: "40302137249",
  appId: "1:40302137249:web:1962fefcb856c6ff3245e0",
  measurementId: "G-YG51H5ELPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
