import { db } from "@/firebase/config";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, setDoc, getDoc, where, limit } from "firebase/firestore";

export type Link = {
  id?: string;
  platform: string;
  url: string;
  userId: string;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  username?: string;
  bio?: string;
  phoneNumber?: string;
  description?: string;
};

export const createLink = async (link: { platform: string; url: string; userId: string }) => {
  const docRef = await addDoc(collection(db, "users", link.userId, "links"), link);
  return docRef.id;
};

export const getLinks = async (userId: string) => {
  const q = query(collection(db, "users", userId, "links"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Link[];
};

export const updateLink = async (id: string, userId: string, link: { platform: string; url: string }) => {
  const docRef = doc(db, "users", userId, "links", id);
  await updateDoc(docRef, link);
};

export const deleteLink = async (id: string, userId: string) => {
  const docRef = doc(db, "users", userId, "links", id);
  await deleteDoc(docRef);
};

export const saveUserProfile = async (userId: string, profile: UserProfile) => {
  const userDocRef = doc(db, "users", userId);
  await setDoc(userDocRef, profile, { merge: true });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists() ? (userDocSnap.data() as UserProfile) : null;
};

export const getUserByUsername = async (username: string): Promise<{ uid: string; profile: UserProfile } | null> => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase().trim()),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return {
      uid: docSnap.id,
      profile: docSnap.data() as UserProfile,
    };
  }
  return null;
};