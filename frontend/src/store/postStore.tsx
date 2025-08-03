import { create } from "zustand";
import axios from "axios";
import { backendUrl } from "@/utils/api";

interface Post {
  id: string;
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
  updatePost: (
    id: string,
    data: Partial<Omit<Post, "id" | "authorId">>
  ) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
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
      set({ posts: res.data.posts, loading: false }); // ✅ get the actual array
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch posts", loading: false });
    }
  },

  getUserPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${backendUrl}/api/posts/me`, {
        withCredentials: true,
      });
      set({ userPosts: res.data.posts, loading: false }); // ✅ Extract only posts array
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch user posts",
        loading: false,
      });
    }
  },

  createPost: async (title: string, content: string) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `${backendUrl}/api/posts`,
        { title, content },
        { withCredentials: true }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create post");
      }

      // Optionally update state
      set((state) => ({
        posts: [response.data.post, ...state.posts],
      }));
    } catch (error: any) {
      console.error("Post creation failed:", error.message || error);
      throw error; // ✅ rethrow to allow catching in component
    } finally {
      set({ loading: false });
    }
  },

  updatePost: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put<Post>(`${backendUrl}/api/posts/${id}`, data, {
        withCredentials: true,
      });
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? res.data : post)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to update post", loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${backendUrl}/api/posts/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete post", loading: false });
    }
  },
}));
