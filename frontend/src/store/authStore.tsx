import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";
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
        } catch (err: unknown) {
          const errorMessage =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Registration failed";
          set({ error: errorMessage, loading: false });
          throw err;
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
        } catch (err: unknown) {
          const errorMessage =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Login failed";
          set({ error: errorMessage, loading: false });
          throw err;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.post(`${backendUrl}/api/user/logout`, {}, { withCredentials: true });
          set({ user: null, loading: false, error: null });
        } catch (err: unknown) {
          set({ user: null, loading: false, error: null });
          console.error("Logout error:", err);
        }
      },

      profile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${backendUrl}/api/user/profile`, {
            withCredentials: true,
          });
          set({ user: response.data.user, loading: false, error: null });
        } catch (err: unknown) {
          const errorMessage =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Profile fetch failed";
          set({ error: errorMessage, loading: false, user: null });
          throw err;
        }
      },

      checkAuth: async () => {
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
            isInitialized: true,
          });
        } catch (err: unknown) {
          set({
            user: null,
            loading: false,
            error: null,
            isInitialized: true,
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
        isInitialized: state.isInitialized,
      }),
    }
  )
);
