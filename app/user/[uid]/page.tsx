"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserProfile, getLinks, getUserByUsername, Link, UserProfile } from "@/lib/firebase/db";
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
        let resolvedUid = uid;
        let userProfile = await getUserProfile(uid);

        // Fallback: search by username slug if not found by UID
        if (!userProfile) {
          const resolvedUser = await getUserByUsername(uid);
          if (resolvedUser) {
            resolvedUid = resolvedUser.uid;
            userProfile = resolvedUser.profile;
          }
        }

        if (!userProfile) {
          setNotFound(true);
          return;
        }

        setProfile({
          firstName: userProfile.firstName || "",
          lastName: userProfile.lastName || "",
          email: userProfile.email || "",
          profileImage: userProfile.profileImage || "",
          username: userProfile.username || "",
          bio: userProfile.bio || "",
          phoneNumber: userProfile.phoneNumber || "",
          description: userProfile.description || "",
        });

        const userLinks = await getLinks(resolvedUid);
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
          href="/"
          className="px-6 py-3 bg-[#633CFF] hover:bg-[#5733E5] text-white font-semibold rounded-lg transition-colors shadow-sm"
        >
          Create Your Own Profile
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] mb-12 select-none">
      <div className="absolute top-0 left-0 w-full h-[357px] bg-[#633CFF] rounded-b-[32px] -z-10 hidden md:block"></div>
      {/* Centered Preview Card */}
      <main className="flex justify-center items-center px-4 pt-6 md:pt-12">
        <div className="bg-white rounded-3xl px-14 py-12 w-full max-w-[500px] flex flex-col items-center">
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
          {/* Name/Username Header */}
          <h1 className="text-[#333333] text-2xl md:text-3xl font-bold text-center truncate max-w-full">
            {profile.username ? (
              `@${profile.username}`
            ) : profile.firstName || profile.lastName ? (
              `${profile.firstName} ${profile.lastName}`
            ) : (
              <span className="text-gray-400 text-lg italic">Anonymous Developer</span>
            )}
          </h1>
          {/* Subtitle Full Name (only if username is set) */}
          {profile.username && (profile.firstName || profile.lastName) && (
            <p className="text-[#737373] text-sm font-medium text-center mt-0.5">
              {profile.firstName} {profile.lastName}
            </p>
          )}
          {/* Bio Headline */}
          {profile.bio && (
            <p className="text-[#737373] text-sm italic text-center mt-0.5 px-4 max-w-full">
              &quot;{profile.bio}&quot;
            </p>
          )}
          {/* Contact Details (Email & Phone Number) */}
          <div className="flex flex-col items-center gap-1 mt-0.5 mb-4 w-full text-xs text-[#737373]">
            {profile.email && <span className="truncate max-w-full">{profile.email}</span>}
            {profile.phoneNumber && <span>{profile.phoneNumber}</span>}
          </div>
          {/* Description */}
          {profile.description && (
            <p className="text-[#333333] text-sm text-center px-4 mb-4 whitespace-pre-wrap max-w-full leading-relaxed border-t border-gray-50 pt-4 w-full">
              {profile.description}
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
          {/* Create Your Own Profile button for guests/viewers */}
          <div className="mt-8 w-full border-t border-gray-100 pt-4">
            <a
              href="/"
              className="flex items-center justify-center h-12 w-full border border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF] font-semibold rounded-lg transition-colors text-base"
            >
              Create Your Own Profile
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}