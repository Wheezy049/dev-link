"use client";
import { useAppContext } from "@/context/AppContext";
import ProfileEditor from "@/components/ProfileEditor";

export default function ProfilePage() {
  const { loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#633CFF]"></div>
      </div>
    );
  }

  return <ProfileEditor />;
}