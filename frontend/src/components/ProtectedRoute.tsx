// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading, profile } = useAuthStore();

  useEffect(() => {
    if (!user) profile();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); 
    }
  }, [user, loading]);

  if (loading || !user) {
    return <p className="text-center mt-10">Loading user...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
