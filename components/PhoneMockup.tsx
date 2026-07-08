"use client";
import React from "react";
import { platforms } from "@/lib/platforms";
import { ArrowRight } from "lucide-react";

export type SavedNameProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Link = {
  id?: string;
  platform: string;
  url: string;
  userId: string;
};

interface PhoneMockupProps {
  links: Link[];
  savedName: SavedNameProps;
  image: string;
}

export default function PhoneMockup({ links, savedName, image }: PhoneMockupProps) {
  console.log("PhoneMockup received links:", links);
  return (
    <div className="hidden lg:flex justify-center items-center w-[560px] h-[834px] p-6 rounded-[24px] bg-white select-none">
      {/* Outer Phone Frame */}
      <div className="relative w-[340px] h-[631px] rounded-[40px] border border-[#737373] bg-white flex flex-col items-center p-6 overflow-hidden">
        
        {/* Notch / Speaker Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#FAFAFA] border-b border-r border-l border-gray-200 rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Screen Scrollable View */}
        <div className="w-full h-full flex flex-col items-center pt-8 overflow-y-auto no-scrollbar">
          
          {/* Profile Picture */}
          <div className="relative w-[96px] h-[96px] rounded-full bg-[#EEEEEE] overflow-hidden flex items-center justify-center border-2 border-gray-100 mt-4 transition-all">
            {image ? (
              <img
                src={image}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
            )}
          </div>

          {/* Names Display */}
          <div className="mt-6 flex flex-col items-center text-center w-full min-h-[50px]">
            {savedName.firstName || savedName.lastName ? (
              <h2 className="text-[#333333] text-lg font-bold truncate max-w-[220px]">
                {savedName.firstName} {savedName.lastName}
              </h2>
            ) : (
              <div className="h-4 w-32 bg-[#EEEEEE] rounded animate-pulse"></div>
            )}

            {savedName.email ? (
              <p className="text-[#737373] text-xs mt-1 truncate max-w-[200px]">
                {savedName.email}
              </p>
            ) : (
              <div className="h-3 w-24 bg-[#EEEEEE] rounded mt-2 animate-pulse"></div>
            )}
          </div>

          {/* Links View list */}
          <div className="mt-10 flex flex-col gap-5 w-full max-h-[300px] overflow-y-auto no-scrollbar pr-1">
            {links.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-11 w-full bg-[#EEEEEE] rounded-lg animate-pulse"
                ></div>
              ))
            ) : (
              links.map((link, idx) => {
                const platformId = (link.platform || "").toLowerCase();
                const config = platforms.find((p) => p.id === platformId) || {
                  bg: "bg-gray-400",
                  name: link.platform || "Custom Link",
                  icon: null,
                };
                return (
                  <a
                    key={link.id || idx}
                    href={link.url || "#"}
                    target={link.url ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!link.url) e.preventDefault();
                    }}
                    className={`flex items-center justify-between px-4 py-3 h-11 w-full text-white text-xs font-semibold rounded-lg shadow-sm transition-all hover:opacity-90 active:scale-[0.98] ${config.bg}`}
                  >
                    <div className="flex items-center gap-2">
                      {config.icon}
                      <span>{config.name}</span>
                    </div>
                    {/* Arrow Icon */}
                    <ArrowRight size={16} />
                  </a>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}