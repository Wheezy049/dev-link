// hooks/useAuth.ts
"use client";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    if (!loading) {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/logIn');
      }
    }
  }, [user, loading, router]);

  return { user, loading, error, isAuthenticated };
};

export default useAuth;