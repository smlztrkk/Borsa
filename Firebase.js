// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE5puAF1Gwwh8rYc7IXQHhTa714vCsh0o",
  authDomain: "login-register-b8d6f.firebaseapp.com",
  projectId: "login-register-b8d6f",
  storageBucket: "login-register-b8d6f.appspot.com",
  messagingSenderId: "885742403961",
  appId: "1:885742403961:web:a17ffa0ea480d31d56efa8",
  measurementId: "G-B4L3YJSCH1",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(firebase);
