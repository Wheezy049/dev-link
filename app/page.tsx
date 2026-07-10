"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function RootIndex() {
  const { user, loading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#633CFF]"></div>
    </div>
  );
}