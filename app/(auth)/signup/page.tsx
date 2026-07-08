"use client";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Link from "next/link";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Link2, Mail, Lock } from "lucide-react";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [createUserWithEmailAndPassword, user, loading, firebaseError] = 
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Can't be empty");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("Can't be empty");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("At least 8 chars");
      hasError = true;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Can't be empty");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords mismatch");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (res?.user) {
        toast.success("Successfully registered! Please log in.");
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  useEffect(() => {
    if (firebaseError) {
      const code = firebaseError.code;
      if (code.includes("auth/email-already-in-use")) {
        toast.error("This email is already registered.");
      } else if (code.includes("auth/invalid-email")) {
        toast.error("Invalid email format.");
      } else if (code.includes("auth/weak-password")) {
        toast.error("Password is too weak.");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    }
  }, [firebaseError]);

  return (
    <div className="flex flex-col justify-center min-h-screen w-full items-center bg-[#FAFAFA] py-12 px-4">
      {/* Logo Header */}
      <div className="flex gap-2 justify-center items-center mb-12 select-none">
        <Link2 size={32} className="text-[#633CFF]" />
        <h1 className="text-[#333333] text-3xl font-bold">devlinks</h1>
      </div>

      {/* Form Container Card */}
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-[476px] p-8 md:p-10 bg-white border border-[#D9D9D9] rounded-xl shadow-sm"
      >
        <h2 className="text-[#333333] text-2xl md:text-3xl font-bold mb-2">Create account</h2>
        <p className="text-[#737373] text-base mb-10">Let’s get you started sharing your links!</p>

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
          <label className="mb-1 block text-[#333333] text-xs font-normal">Create password</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            passwordError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <Lock size={16} className="text-[#737373]" />
            </span>
            <input
              type="password"
              placeholder="At least 8 characters"
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

        {/* Confirm Password Field */}
        <div className="mb-2">
          <label className="mb-1 block text-[#333333] text-xs font-normal">Confirm password</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            confirmPasswordError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <Lock size={16} className="text-[#737373]" />
            </span>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value.trim()) setConfirmPasswordError("");
              }}
              className="text-[#333333] text-base outline-none border-none w-full bg-transparent"
            />
            {confirmPasswordError && (
              <span className="absolute right-4 text-xs font-normal text-red-500 bg-white px-1">
                {confirmPasswordError}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-[#737373] mb-6 mt-4">Password must contain at least 8 characters</p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 rounded-lg flex justify-center items-center py-3 bg-[#633CFF] hover:bg-[#BEADFF] text-white text-base font-semibold mb-6 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating account..." : "Create new account"}
        </button>

        {/* Login Link */}
        <div className="flex flex-col sm:flex-row gap-1 text-base justify-center items-center">
          <p className="text-[#737373]">Already have an account?</p>
          <Link href="/login" className="text-[#633CFF] hover:underline font-normal">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
