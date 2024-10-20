import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  doc, getDoc, setDoc } from "firebase/firestore";
import { User } from 'firebase/auth';

interface AdditionalUserData {
  displayName?: string | null;
  email?: string | null;
}

const firebaseConfig = {
  apiKey: "AIzaSyCTaHIsg-n-s1rA74FQWgM5Fj9iwf0BOd8",
  authDomain: "devlink-1781c.firebaseapp.com",
  projectId: "devlink-1781c",
  storageBucket: "devlink-1781c.appspot.com",
  messagingSenderId: "832026602922",
  appId: "1:832026602922:web:860363f15628b48152cfd3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

const db = getFirestore(app)


export {auth, db, app}