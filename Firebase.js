import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDE5puAF1Gwwh8rYc7IXQHhTa714vCsh0o",
  authDomain: "login-register-b8d6f.firebaseapp.com",
  databaseURL: "https://login-register-b8d6f-default-rtdb.firebaseio.com",
  projectId: "login-register-b8d6f",
  storageBucket: "login-register-b8d6f.appspot.com",
  messagingSenderId: "885742403961",
  appId: "1:885742403961:web:a17ffa0ea480d31d56efa8",
};

const app = initializeApp(firebaseConfig);

// Firebase Auth'un zaten başlatılıp başlatılmadığını kontrol edin
let auth;
if (!app._isInitializedAuth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  app._isInitializedAuth = true;
} else {
  auth = getAuth(app); // Eğer zaten başlatıldıysa, mevcut auth'u alın
}

const db = getFirestore(app);

export { auth, db };
