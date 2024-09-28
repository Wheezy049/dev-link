"use client"
import Profile from '@/components/profile/profile'
import React from 'react'
import { useState } from 'react';


export type SavedNameProps = {
  firstName: string;
  lastName: string;
};



function Page() {
  
  const [savedName, setSavedName] = useState<SavedNameProps>({
    firstName: "",
    lastName: "",
  }); 


  const handleSetSavedName = (name: { firstName: string; lastName: string }) => {
    setSavedName(name); // Directly update without spreading
  };

  
  return (
    <div>
      <Profile savedName={savedName} setSavedName={handleSetSavedName}/>
    </div>
  )
}

export default Page