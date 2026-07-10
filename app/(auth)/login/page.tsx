"use client";
import { auth } from "@/firebase/config";
import React, { useEffect, useRef, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Link2, Mail, Lock } from "lucide-react";

export default function LogIn() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEmailError("");
    setPasswordError("");
    
    let hasError = false;
    if (!email.trim()) {
      setEmailError("Can't be empty");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("Can't be empty");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        toast.success("Successfully logged in!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (firebaseError) {
      const msg = firebaseError.code;
      if (msg.includes("auth/invalid-credential") || msg.includes("auth/user-not-found") || msg.includes("auth/wrong-password")) {
        toast.error("Invalid email or password.");
      } else if (msg.includes("auth/invalid-email")) {
        toast.error("Invalid email format.");
      } else {
        toast.error("Failed to sign in. Please try again.");
      }
    }
  }, [firebaseError]);

  return (
    <div className="flex flex-col justify-center min-h-screen w-full items-center bg-[#FAFAFA] py-12 px-4">
      {/* Logo Header */}
      <div className="flex gap-2 justify-center items-center mb-6 select-none">
        <Link2 size={32} className="text-[#633CFF]" />
        <h1 className="text-[#333333] text-3xl font-bold">devlinks</h1>
      </div>
      {/* Form Container Card */}
      <form
        onSubmit={handleLogIn}
        className="w-full max-w-[476px] p-8 md:p-10 bg-white rounded-xl"
      >
        <h2 className="text-[#333333] text-2xl md:text-3xl font-bold mb-1">Login</h2>
        <p className="text-[#737373] text-base mb-5">
          Add your details below to get back into the app
        </p>
        {/* Email Field */}
        <div className="mb-6">
          <label className="mb-1 block text-[#333333] text-xs font-normal">Email address</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            emailError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <Mail size={16} className="text-[#737373]" />
            </span>
            <input
              type="email"
              placeholder="e.g. alex@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setEmailError("");
              }}
              ref={inputRef}
              className="text-[#333333] text-base outline-none border-none w-full bg-transparent"
            />
            {emailError && (
              <span className="absolute right-4 text-xs font-normal text-red-500 bg-white px-1">
                {emailError}
              </span>
            )}
          </div>
        </div>
        {/* Password Field */}
        <div className="mb-6">
          <label className="mb-1 block text-[#333333] text-xs font-normal">Password</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            passwordError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <Lock size={16} className="text-[#737373]" />
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              className="text-[#333333] text-base outline-none border-none w-full bg-transparent"
            />
            {passwordError && (
              <span className="absolute right-4 text-xs font-normal text-red-500 bg-white px-1">
                {passwordError}
              </span>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 rounded-lg flex justify-center items-center py-3 bg-[#633CFF] hover:bg-[#5733E5] text-white text-base font-semibold mb-6 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
        {/* Create Account Link */}
        <div className="flex flex-col sm:flex-row gap-1 text-base justify-center items-center">
          <p className="text-[#737373]">Don&apos;t have an account?</p>
          <a href="/signup" className="text-[#633CFF] hover:underline font-normal">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
}