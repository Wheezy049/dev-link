"use client";
import { auth } from "@/firebase/config";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type UseAuthReturn = {
  user: any;
  loading: boolean;
  error: Error | undefined;
  isAuthenticated: boolean;
};

const useAuth = (): UseAuthReturn => {
  const [user, loading, error] = useAuthState(auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (user) {
        setIsAuthenticated(true);
        if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
          router.push("/dashboard");
        }
      } else {
        setIsAuthenticated(false);
        const isAuthPage = pathname === "/login" || pathname === "/signup";
        const isPublicProfile = pathname?.startsWith("/user/");
        if (!isAuthPage && !isPublicProfile) {
          router.push("/login");
        }
      }
    }
  }, [user, loading, router, pathname]);

  return { user, loading, error, isAuthenticated };
};

export default useAuth;