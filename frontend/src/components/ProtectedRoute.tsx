"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { checkAuth, isInitialized, loading } = useAuthStore();

  useEffect(() => {
    // Check authentication status on app initialization
    if (!isInitialized) {
      checkAuth();
    }
  }, [checkAuth, isInitialized]);

  // Show loading spinner while checking authentication
  if (!isInitialized && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Initializing application...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider