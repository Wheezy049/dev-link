"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { platforms } from "@/lib/platforms";
import Link from "next/link";

export default function PreviewPage() {
  const { user, profile, image, links, loading } = useAppContext();
  const router = useRouter();

  const handleShare = () => {
    if (!user) return;
    const shareUrl = `${window.location.origin}/user/${user.uid}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("The link has been copied to your clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        toast.error("Failed to copy link.");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#633CFF]"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] pb-12 select-none">
      {/* Decorative Purple Banner */}
      <div className="absolute top-0 left-0 w-full h-[357px] bg-[#633CFF] rounded-b-[32px] -z-10 hidden md:block"></div>

      {/* Header Container */}
      <header className="p-4 max-w-[1392px] mx-auto md:pt-6">
        <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-3 border border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF] transition-colors rounded-lg font-semibold text-sm md:text-base"
          >
            Back to Editor
          </button>
          <button
            onClick={handleShare}
            className="px-5 py-3 bg-[#633CFF] hover:bg-[#BEADFF] text-white transition-colors rounded-lg font-semibold text-sm md:text-base"
          >
            Share Link
          </button>
        </div>
      </header>

      {/* Centered Preview Card */}
      <main className="flex justify-center items-center px-4 mt-16 md:mt-24">
        <div className="bg-white rounded-3xl border border-[#D9D9D9] md:border-none shadow-sm md:shadow-md px-14 py-12 w-full max-w-[349px] flex flex-col items-center">
          
          {/* Avatar Picture */}
          <div className="w-[104px] h-[104px] rounded-full overflow-hidden flex items-center justify-center border-4 border-[#633CFF] mb-6 shadow-sm">
            {image ? (
              <img
                src={image}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}
          </div>

          {/* Name Header */}
          <h1 className="text-[#333333] text-2xl md:text-3xl font-bold text-center truncate max-w-full mb-2">
            {profile.firstName || profile.lastName ? (
              `${profile.firstName} ${profile.lastName}`
            ) : (
              <span className="text-gray-400 text-lg italic">No Name Set</span>
            )}
          </h1>

          {/* Email Text */}
          <p className="text-[#737373] text-base text-center truncate max-w-full mb-14">
            {profile.email || <span className="text-gray-400 italic">No email set</span>}
          </p>

          {/* Render Active styled brand links */}
          <div className="flex flex-col gap-5 w-full">
            {links.length === 0 ? (
              <p className="text-[#737373] text-sm text-center italic">No links added yet.</p>
            ) : (
              links.map((link, idx) => {
                const config = platforms.find(p => p.id === link.platform.toLowerCase()) || {
                  bg: "bg-gray-400",
                  name: link.platform,
                  icon: null,
                };
                return (
                  <a
                    key={link.id || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-6 py-4 h-14 w-full text-white text-base font-semibold rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 hover:shadow-md ${config.bg}`}
                  >
                    <div className="flex items-center gap-3">
                      {config.icon}
                      <span>{config.name}</span>
                    </div>
                    {/* Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path fill="currentColor" d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                );
              })
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
