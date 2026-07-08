"use client";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Link from "next/link";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

    // Reset errors
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

  // Toast errors from firebase auth
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
      {/* Centered Logo Header */}
      <div className="flex gap-2 justify-center items-center mb-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.61875 27.38C6.57341 29.3334 9.71475 29.3334 16.0001 29.3334C22.2854 29.3334 25.4281 29.3334 27.3801 27.38C29.3334 25.4294 29.3334 22.2854 29.3334 16C29.3334 9.71469 29.3334 6.57202 27.3801 4.61869C25.4294 2.66669 22.2854 2.66669 16.0001 2.66669C9.71475 2.66669 6.57208 2.66669 4.61875 4.61869C2.66675 6.57335 2.66675 9.71469 2.66675 16C2.66675 22.2854 2.66675 25.428 4.61875 27.38ZM12.6667 11.6667C11.8097 11.6667 10.9719 11.9208 10.2593 12.397C9.54666 12.8731 8.99125 13.5499 8.66327 14.3417C8.33529 15.1335 8.24948 16.0048 8.41668 16.8454C8.58388 17.686 8.99659 18.4581 9.60262 19.0641C10.2086 19.6702 10.9808 20.0829 11.8214 20.2501C12.6619 20.4173 13.5332 20.3315 14.325 20.0035C15.1169 19.6755 15.7936 19.1201 16.2698 18.4075C16.7459 17.6949 17.0001 16.8571 17.0001 16C17.0001 15.7348 17.1054 15.4804 17.293 15.2929C17.4805 15.1054 17.7349 15 18.0001 15C18.2653 15 18.5197 15.1054 18.7072 15.2929C18.8947 15.4804 19.0001 15.7348 19.0001 16C19.0001 17.2526 18.6286 18.4771 17.9327 19.5186C17.2368 20.5601 16.2477 21.3719 15.0904 21.8513C13.9331 22.3306 12.6597 22.456 11.4312 22.2117C10.2026 21.9673 9.07414 21.3641 8.18841 20.4784C7.30267 19.5926 6.69948 18.4641 6.45511 17.2356C6.21073 16.007 6.33616 14.7336 6.81551 13.5764C7.29487 12.4191 8.10663 11.43 9.14814 10.734C10.1896 10.0381 11.4141 9.66669 12.6667 9.66669C12.932 9.66669 13.1863 9.77204 13.3739 9.95958C13.5614 10.1471 13.6667 10.4015 13.6667 10.6667C13.6667 10.9319 13.5614 11.1863 13.3739 11.3738C13.1863 11.5613 12.932 11.6667 12.6667 11.6667ZM23.6667 16C23.6667 17.1493 23.2102 18.2515 22.3975 19.0641C21.5849 19.8768 20.4827 20.3334 19.3334 20.3334C19.0682 20.3334 18.8138 20.4387 18.6263 20.6262C18.4388 20.8138 18.3334 21.0681 18.3334 21.3334C18.3334 21.5986 18.4388 21.8529 18.6263 22.0405C18.8138 22.228 19.0682 22.3334 19.3334 22.3334C20.586 22.3334 21.8105 21.9619 22.852 21.266C23.8935 20.5701 24.7053 19.5809 25.1847 18.4237C25.664 17.2664 25.7894 15.993 25.5451 14.7644C25.3007 13.5359 24.6975 12.4074 23.8118 11.5217C22.926 10.6359 21.7975 10.0328 20.569 9.78838C19.3404 9.54401 18.067 9.66943 16.9098 10.1488C15.7525 10.5904 14.7634 11.4399 14.0674 12.4814C13.3715 13.5229 13.0001 14.7474 13.0001 16C13.0001 16.2652 13.1054 16.5196 13.293 16.7071C13.4805 16.8947 13.7349 17 14.0001 17C14.2653 17 14.5197 16.8947 14.7072 16.7071C14.8947 16.5196 15.0001 16.2652 15.0001 16C15.0001 14.8507 15.4566 13.7485 16.2693 12.9359C17.0819 12.1232 18.1841 11.6667 19.3334 11.6667C20.4827 11.6667 21.5849 12.1232 22.3975 12.9359C23.2102 13.7485 23.6667 14.8507 23.6667 16Z"
            fill="#633CFF"
          />
        </svg>
        <h1 className="text-[#333333] text-3xl font-bold">devlinks</h1>
      </div>

      {/* Styled Form Container Card */}
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-[476px] p-8 md:p-10 bg-white border border-[#D9D9D9] rounded-xl shadow-sm"
      >
        <h2 className="text-[#333333] text-2xl md:text-3xl font-bold mb-2">Create account</h2>
        <p className="text-[#737373] text-base mb-10">Let’s get you started sharing your links!</p>

        {/* Email Field Container */}
        <div className="mb-6">
          <label className="mb-1 block text-[#333333] text-xs font-normal">Email address</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            emailError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="#737373" d="M14 3H2C1.867 3 1.74.053 1.646.146C1.553.24 1.5.367 1.5.5V12C1.5 12.265 1.605 12.52 1.793 12.707C1.98 12.895 2.235 13 2.5 13H13.5C13.765 13 14.02 12.895 14.207 12.707C14.395 12.52 14.5 12.265 14.5 12V3.5C14.5 3.367 14.447 3.24 14.354 3.146C14.26 3.053 14.133 3 14 3ZM13.5 12H2.5V4.637L7.662 9.369a.499.499 0 0 0 .676 0L13.5 4.637V12Z"/>
              </svg>
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

        {/* Create Password Field Container */}
        <div className="mb-6">
          <label className="mb-1 block text-[#333333] text-xs font-normal">Create password</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            passwordError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="#737373" d="M12 6H11V4.5C11 2.57 9.43 1 7.5 1S4 2.57 4 4.5V6H3C1.9 6 1 6.9 1 8V13C1 14.1 1.9 15 3 15H12C13.1 15 14 14.1 14 13V8C14 6.9 13.1 6 12 6ZM5.5 4.5C5.5 3.4 6.4 2.5 7.5 2.5S9.5 3.4 9.5 4.5V6H5.5V4.5ZM12.5 13.5H2.5V8.5H12.5V13.5Z"/>
              </svg>
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

        {/* Confirm Password Field Container */}
        <div className="mb-2">
          <label className="mb-1 block text-[#333333] text-xs font-normal">Confirm password</label>
          <div className={`relative flex items-center border rounded-lg bg-white px-4 py-3 h-12 transition-all ${
            confirmPasswordError ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.25)]"
          }`}>
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="#737373" d="M12 6H11V4.5C11 2.57 9.43 1 7.5 1S4 2.57 4 4.5V6H3C1.9 6 1 6.9 1 8V13C1 14.1 1.9 15 3 15H12C13.1 15 14 14.1 14 13V8C14 6.9 13.1 6 12 6ZM5.5 4.5C5.5 3.4 6.4 2.5 7.5 2.5S9.5 3.4 9.5 4.5V6H5.5V4.5ZM12.5 13.5H2.5V8.5H12.5V13.5Z"/>
              </svg>
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
