import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { backendUrl } from "@/utils/api";

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  register: (name: string, email: string, password: string, bio: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  profile: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isInitialized: false,

      register: async (name, email, password, bio) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            `${backendUrl}/api/user/register`,
            { name, email, password, bio },
            { withCredentials: true }
          );
          set({ user: response.data.user, loading: false, error: null });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Registration failed";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            `${backendUrl}/api/user/login`,
            { email, password },
            { withCredentials: true }
          );
          set({ user: response.data.user, loading: false, error: null });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Login failed";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.post(`${backendUrl}/api/user/logout`, {}, { withCredentials: true });
          set({ user: null, loading: false, error: null });
        } catch (error: any) {
          // Even if logout fails on server, clear local state
          set({ user: null, loading: false, error: null });
          console.error("Logout error:", error);
        }
      },

      profile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${backendUrl}/api/user/profile`, {
            withCredentials: true,
          });
          set({ user: response.data.user, loading: false, error: null });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Profile fetch failed";
          set({ error: errorMessage, loading: false, user: null });
          throw error;
        }
      },

      checkAuth: async () => {
        // Only check auth if we haven't initialized yet
        if (get().isInitialized) return;
        
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${backendUrl}/api/user/profile`, {
            withCredentials: true,
          });
          set({ 
            user: response.data.user, 
            loading: false, 
            error: null,
            isInitialized: true 
          });
        } catch (error: any) {
          // If auth check fails, user is not authenticated
          set({ 
            user: null, 
            loading: false, 
            error: null,
            isInitialized: true 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ 
        user: state.user,
        isInitialized: state.isInitialized 
      }),
    }
  )
);