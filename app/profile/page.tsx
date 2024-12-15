"use client"
import Layout from '@/components/layout';
import Profile from '@/components/profile/profile'
import React from 'react'
import { useState, useEffect } from 'react';


export type SavedNameProps = {
  firstName: string;
  lastName: string;
  email: string;
};

function Page() {
  
  const [savedName, setSavedName] = useState<SavedNameProps>({
    firstName: "",
    lastName: "",
    email: "",
  }); 

  const [image, setImage] = useState<string>('');

  const handleSetImage = (imageUrl: string) => {
    setImage(imageUrl);
  };


  useEffect(() => {
    const storedName = localStorage.getItem("savedName");
    if (storedName) {
      setSavedName(JSON.parse(storedName));
    }
  }, []);

  const handleSetSavedName = (name: SavedNameProps) => {
    setSavedName(name);
    localStorage.setItem("savedName", JSON.stringify(name));
  }

  
  return (
    <div className=''>
      <Layout>
      <Profile savedName={savedName} setSavedName={handleSetSavedName} image={image} setImage={handleSetImage}/>
      </Layout>
    </div>
  )
}

export default Page