"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Link2, User, LogOut, Eye } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out.");
    }
  };

  return (
    <div className="bg-white w-full m-0 px-6 py-4 flex justify-between rounded-[24px] select-none">
      {/* Brand Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Link2 size={32} className="text-[#633CFF]" />
        <h1 className="hidden md:block text-[#333333] text-2xl font-bold">
          devlinks
        </h1>
      </Link>

      {/* Tabs Navigation */}
      <div className="flex gap-2 items-center">
        <Link
          href={"/"}
          className={`flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-base transition-colors ${
            pathname === "/" ? "bg-[#EFEBFF] text-[#633CFF]" : "text-[#737373] hover:text-[#633CFF]"
          }`}
        >
          <Link2 size={20} />
          <span className="hidden md:block">Links</span>
        </Link>
        <Link
          href={"/profile"}
          className={`flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-base transition-colors ${
            pathname === "/profile" ? "bg-[#EFEBFF] text-[#633CFF]" : "text-[#737373] hover:text-[#633CFF]"
          }`}
        >
          <User size={20} />
          <span className="hidden md:block">Profile Details</span>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Desktop Buttons */}
        <button 
          onClick={handleLogout}
          className="hidden md:block text-[#737373] hover:text-red-500 transition-colors font-semibold text-base"
        >
          Logout
        </button>
        <Link 
          href="/preview"
          className="hidden md:flex justify-center px-7 py-3 rounded-lg border border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF] transition-colors font-semibold text-base"
        >
          Preview
        </Link>

        {/* Mobile Buttons */}
        <button 
          onClick={handleLogout}
          className="flex md:hidden p-2 text-[#737373] hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
        <Link 
          href="/preview"
          className="flex md:hidden p-2 border border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF] transition-colors rounded-lg"
          title="Preview"
        >
          <Eye size={20} />
        </Link>
      </div>
    </div>
  );
}