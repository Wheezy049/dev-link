"use client"
import React from "react";
import { useState, useEffect } from "react";
import SkeletonSideBar from "./skeletonSideBar/skeletonSiseBar";
import Header from "./header/header";
import useAuth from "@/useAuth/useAuth";
import { getLinks, getUserProfile, saveUserProfile } from "@/CRUD/crud";

export type Link = {
    platform: string;
    url: string;
    id?: string;
    userId: string;
  };

  export type SavedNameProps = {
    firstName: string;
    lastName: string;
    email: string;
  };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [savedName, setSavedName] = useState({ firstName: "", lastName: "", email: ""});
  const [image, setImage] = useState<string>('');

  // const handleSetImage = (imageUrl: string) => {
  //   setImage(imageUrl);
  // }


  useEffect(() => {
    if (user) {
      const fetchLinks = async () => {
        const userLinks = await getLinks(user.uid);
        setLinks(userLinks.map(link => ({ ...link, userId: link.userId || user.uid })));
      };
      fetchLinks();
    }
  }, [user]);


  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setSavedName({
            firstName: userProfile.firstName || "",
            lastName: userProfile.lastName || "",
            email: userProfile.email || "",
          });
        }
  
        const userLinks = await getLinks(user.uid);
        setLinks(userLinks.map(link => ({ ...link, userId: link.userId || user.uid })));
      };
      fetchUserData();
    }
  }, [user]);
  
  const handleSaveProfile = async (profile: { firstName: string; lastName: string, email: string }) => {
    if (user) {
      await saveUserProfile(user.uid, profile);
      setSavedName(profile); // Update local state
    }
  };
  

  return (
    <div className="w-full">
        <Header />
     <div className="flex flex-col lg:flex-row justify-center items-center m-6 gap-6">
        <SkeletonSideBar links={links} savedName={savedName} image={image}/>
        {React.cloneElement(children as React.ReactElement, { links, setLinks, setSavedName, savedName, handleSaveProfile, setImage })}
     </div>
     </div>
  );
}