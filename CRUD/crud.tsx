import { db } from "@/firebase/config"; // Adjust the import to your firebase configuration
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, setDoc, getDoc} from "firebase/firestore";


export type Link = {
  platform: string;
  url: string;
  id?: string;
  userId: string;
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


export const saveUserProfile = async (userId: string, profile: { firstName: string; lastName: string; email: string }) => {
  const userDocRef = doc(db, "users", userId);
  await setDoc(userDocRef, { ...profile }, { merge: true });
};

export const getUserProfile = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists() ? userDocSnap.data() : null;
};