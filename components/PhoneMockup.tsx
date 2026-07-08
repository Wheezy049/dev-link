"use client";
import React from "react";

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

// Brand color maps
const brandStyles: Record<string, { bg: string; name: string; icon: React.ReactNode }> = {
  github: {
    bg: "bg-[#1A1A1A] hover:bg-[#333333]",
    name: "GitHub",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    )
  },
  facebook: {
    bg: "bg-[#1877F2] hover:bg-[#3b5998]",
    name: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
      </svg>
    )
  },
  twitter: {
    bg: "bg-[#1D9BF0] hover:bg-[#007cc4]",
    name: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/>
      </svg>
    )
  },
  instagram: {
    bg: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:brightness-110",
    name: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.21.51.5 1.049.92 1.467.418.419.957.708 1.468.908.5.198 1.08.333 1.94.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.909-1.396.197-.5.331-1.082.37-1.936.04-.852.05-1.123.05-3.297 0-2.172-.01-2.444-.048-3.298c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0H8zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
      </svg>
    )
  },
  linkedin: {
    bg: "bg-[#0A66C2] hover:bg-[#004182]",
    name: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm10.99 8.212V9.359c0-2.167-1.157-3.178-2.702-3.178-1.246 0-1.794.686-2.105 1.178h.017V6.169H7.497c.032.678 0 7.225 0 7.225h2.401V9.752c0-.401.029-.803.147-1.089.324-.803 1.06-1.636 2.292-1.636 1.616 0 2.261 1.233 2.261 3.042v4.18H14.77z"/>
      </svg>
    )
  }
};

export default function PhoneMockup({ links, savedName, image }: PhoneMockupProps) {
  return (
    <div className="hidden lg:flex justify-center items-center w-[560px] h-[834px] border border-[#D9D9D9] p-6 rounded-xl bg-white select-none">
      {/* Outer Phone Frame */}
      <div className="relative w-[307px] h-[631px] rounded-[40px] border-[12px] border-[#737373] bg-white flex flex-col items-center p-6 shadow-md overflow-hidden">
        
        {/* Notch / Speaker Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#FAFAFA] border-b border-r border-l border-gray-200 rounded-b-2xl z-20 flex items-center justify-center">
          <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
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
              // Pulsate placeholder
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
              // 4 Skeleton items
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-11 w-full bg-[#EEEEEE] rounded-lg animate-pulse"
                ></div>
              ))
            ) : (
              // Active styled brand links
              links.map((link, idx) => {
                const config = brandStyles[link.platform.toLowerCase()] || {
                  bg: "bg-gray-400",
                  name: link.platform,
                  icon: null,
                };
                return (
                  <div
                    key={link.id || idx}
                    className={`flex items-center justify-between px-4 py-3 h-11 w-full text-white text-xs font-semibold rounded-lg shadow-sm transition-all ${config.bg}`}
                  >
                    <div className="flex items-center gap-2">
                      {config.icon}
                      <span>{config.name}</span>
                    </div>
                    {/* Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path fill="currentColor" d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}