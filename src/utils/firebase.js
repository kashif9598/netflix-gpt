// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAylANdeE4Bg_mH-pVtWRF9U2DLxTVJ9bc",
  authDomain: "netflixgpt-26358.firebaseapp.com",
  projectId: "netflixgpt-26358",
  storageBucket: "netflixgpt-26358.appspot.com",
  messagingSenderId: "415844552015",
  appId: "1:415844552015:web:2352f1762ce171b2aa093a",
  measurementId: "G-FLEV2CF4C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
