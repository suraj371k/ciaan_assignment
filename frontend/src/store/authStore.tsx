import { create } from "zustand";
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

  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  profile: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (name: string, email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/register`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      set({ user: response.data.user, loading: false, error: null });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      set({ user: response.data.user, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      set({ user: null, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Logout failed",
        loading: false,
      });
      throw error;
    }
  },

  profile: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        withCredentials: true,
      });
      set({ user: response.data.user, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "fetch profile failed",
        loading: false,
      });
      throw error;
    }
  },
}));
