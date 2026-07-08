"use client";
import React from "react";
import PhoneMockup from "@/components/PhoneMockup";
import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { links, profile, image } = useAppContext();

  return (
    <div className="min-h-screen bg-[#FAFAFA] w-full pb-12">
      <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 flex flex-col gap-6">
        <Header />
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 flex-grow">
          <PhoneMockup links={links} savedName={profile} image={image} />
          <div className="flex-grow w-full lg:w-auto flex justify-center lg:justify-start">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}