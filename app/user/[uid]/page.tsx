"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserProfile, getLinks, Link, UserProfile } from "@/lib/firebase/db";
import { platforms } from "@/lib/platforms";
import { ArrowRight } from "lucide-react";

export default function PublicProfilePage() {
  const { uid } = useParams() as { uid: string };
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const fetchPublicData = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserProfile(uid);
        if (!userProfile) {
          setNotFound(true);
          return;
        }
        setProfile({
          firstName: userProfile.firstName || "",
          lastName: userProfile.lastName || "",
          email: userProfile.email || "",
          profileImage: userProfile.profileImage || "",
        });

        const userLinks = await getLinks(uid);
        setLinks(userLinks);
      } catch (err) {
        console.error("Error loading public profile:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, [uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#633CFF]"></div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] px-4 text-center">
        <h1 className="text-[#333333] text-3xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-[#737373] text-base mb-8">
          The link sharing profile you are trying to visit does not exist or has been removed.
        </p>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-[#633CFF] hover:bg-[#5733E5] text-white font-semibold rounded-lg transition-colors shadow-sm"
        >
          Create Your Own Profile
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] pb-12 select-none">
      <div className="absolute top-0 left-0 w-full h-[357px] bg-[#633CFF] rounded-b-[32px] -z-10 hidden md:block"></div>
      {/* Centered Preview Card */}
      <main className="flex justify-center items-center px-4 pt-16 md:pt-36">
        <div className="bg-white rounded-3xl border border-[#D9D9D9] md:border-none shadow-sm md:shadow-md px-14 py-12 w-full max-w-[349px] flex flex-col items-center">
          {/* Avatar Picture */}
          <div className="w-[104px] h-[104px] rounded-full overflow-hidden flex items-center justify-center border-4 border-[#633CFF] mb-6 shadow-sm">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
          </div>
          {/* Name Header */}
          <h1 className="text-[#333333] text-2xl md:text-3xl font-bold text-center truncate max-w-full mb-2">
            {profile.firstName || profile.lastName ? (
              `${profile.firstName} ${profile.lastName}`
            ) : (
              <span className="text-gray-400 text-lg italic">Anonymous Developer</span>
            )}
          </h1>
          {/* Email Text */}
          {profile.email && (
            <p className="text-[#737373] text-base text-center truncate max-w-full mb-6">
              {profile.email}
            </p>
          )}
          {/* Render Active styled brand links */}
          <div className="flex flex-col gap-5 w-full">
            {links.length === 0 ? (
              <p className="text-[#737373] text-sm text-center italic">No links added by the user.</p>
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
                    <ArrowRight size={16} />
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