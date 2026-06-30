"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setAuth(user),
      () => setAuth(null),
    );
    return unsubscribe;
  }, [setAuth]);

  return <>{children}</>;
}
