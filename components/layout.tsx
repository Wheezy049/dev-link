"use client"
import React from "react";
import { useState, useEffect } from "react";
import SkeletonSideBar from "./skeletonSideBar/skeletonSiseBar";
import Header from "./header/header";
import useAuth from "@/useAuth/useAuth";
import { getLinks } from "@/CRUD/crud";

export type Link = {
    platform: string;
    url: string;
    id?: string;
    userId: string;
  };

  export type SavedNameProps = {
    firstName: string;
    lastName: string;
  };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [savedName, setSavedName] = useState({ firstName: "", lastName: "" });


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
    console.log("Layout: savedName updated:", savedName);
  }, [savedName]); 

  return (
    <div>
        <Header />
     <div className="flex flex-col lg:flex-row justify-center items-center m-6 gap-6">
        <SkeletonSideBar links={links} savedName={savedName} />
        {React.cloneElement(children as React.ReactElement, { links, setLinks, setSavedName, savedName})}
     </div>
     </div>
  );
}