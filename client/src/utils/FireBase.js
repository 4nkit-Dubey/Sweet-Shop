import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sweetshop-login.firebaseapp.com",
  projectId: "sweetshop-login",
  storageBucket: "sweetshop-login.firebasestorage.app",
  messagingSenderId: "466697259334",
  appId: "1:466697259334:web:3e60530a220db2d899fd47"
};

const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const provider = new GoogleAuthProvider();

if (!firebaseConfig.apiKey) {
  console.warn("Firebase is disabled: VITE_FIREBASE_API_KEY is missing.");
}

export { auth, provider };