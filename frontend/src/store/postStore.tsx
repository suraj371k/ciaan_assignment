import { create } from "zustand";
import axios from "axios";
import { backendUrl } from "@/utils/api";
import { AxiosError } from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
    _id: string;
  };
  createdAt: Date;
}

interface PostStore {
  posts: Post[];
  userPosts: Post[];
  loading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
  getUserPosts: () => Promise<void>;
  createPost: (title: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updatePost: (id: string, title: string, content: string) => Promise<void>;
  clearError: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  userPosts: [],
  loading: false,
  error: null,

  getPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${backendUrl}/api/posts`, {
        withCredentials: true,
      });
      set({ posts: res.data.posts || [], loading: false });
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to fetch posts";
      set({ error: message, loading: false });
    }
  },

  getUserPosts: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${backendUrl}/api/posts/me`);
      set({ userPosts: res.data.posts, loading: false });
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to create post";
      set({ error: message, loading: false });
      throw err;
    }
  },

  createPost: async (title: string, content: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${backendUrl}/api/posts`,
        { title, content },
        { withCredentials: true }
      );

      const newPost = response.data.post || response.data;

      set((state) => ({
        posts: [newPost, ...state.posts],
        userPosts: [newPost, ...state.userPosts],
        loading: false,
      }));
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to create post";
      set({ error: message, loading: false });
      throw err;
    }
  },

  updatePost: async (id: string, title: string, content: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${backendUrl}/api/posts/${id}`,
        { title, content },
        { withCredentials: true }
      );

      const updatedPost = response.data.post || response.data;

      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === id ? updatedPost : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === id ? updatedPost : post
        ),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to update post";
      set({ error: message, loading: false });
      throw err;
    }
  },

  deletePost: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${backendUrl}/api/posts/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        userPosts: state.userPosts.filter((post) => post._id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to delete post";
      set({ error: message, loading: false });
      throw err;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
