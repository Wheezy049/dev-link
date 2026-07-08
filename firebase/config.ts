import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  doc, getDoc, setDoc } from "firebase/firestore";
import { User } from 'firebase/auth';

interface AdditionalUserData {
  displayName?: string | null;
  email?: string | null;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCTaHIsg-n-s1rA74FQWgM5Fj9iwf0BOd8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "devlink-1781c.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "devlink-1781c",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "devlink-1781c.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "832026602922",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:832026602922:web:860363f15628b48152cfd3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

const db = getFirestore(app)


export {auth, db, app}