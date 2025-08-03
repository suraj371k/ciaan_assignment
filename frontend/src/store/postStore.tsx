import { create } from "zustand";
import axios from "axios";
import { backendUrl } from "@/utils/api";

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

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  userPosts: [],
  loading: false,
  error: null,

  getPosts: async () => {
    set({ loading: true, error: null });
    try {
      console.log("Fetching all posts from:", `${backendUrl}/api/posts`);
      const res = await axios.get(`${backendUrl}/api/posts`, {
        withCredentials: true,
      });
      
      console.log("Posts response:", res.data);
      set({ posts: res.data.posts || [], loading: false });
    } catch (err: any) {
      console.error("Get posts error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch posts";
      set({ error: errorMessage, loading: false });
    }
  },

  getUserPosts: async () => {
    set({ loading: true, error: null });
    try {
      // Try multiple possible endpoints that backends commonly use
      const possibleEndpoints = [
        `${backendUrl}/api/posts/me`,
        `${backendUrl}/api/posts/user`,
        `${backendUrl}/api/user/posts`,
        `${backendUrl}/api/posts/my-posts`
      ];

      console.log("Attempting to fetch user posts...");
      
      let response;
      let usedEndpoint;
      
      // Try the primary endpoint first
      try {
        console.log("Trying endpoint:", possibleEndpoints[0]);
        response = await axios.get(possibleEndpoints[0], {
          withCredentials: true,
        });
        usedEndpoint = possibleEndpoints[0];
      } catch (primaryError: any) {
        console.warn("Primary endpoint failed:", primaryError.response?.status, primaryError.response?.data);
        
        // If primary fails with 404, try alternative endpoints
        if (primaryError.response?.status === 404) {
          console.log("Trying alternative endpoints...");
          
          for (let i = 1; i < possibleEndpoints.length; i++) {
            try {
              console.log("Trying endpoint:", possibleEndpoints[i]);
              response = await axios.get(possibleEndpoints[i], {
                withCredentials: true,
              });
              usedEndpoint = possibleEndpoints[i];
              console.log("Success with endpoint:", usedEndpoint);
              break;
            } catch (altError: any) {
              console.warn(`Alternative endpoint ${possibleEndpoints[i]} failed:`, altError.response?.status);
              continue;
            }
          }
        }
        
        // If no endpoint worked, throw the original error
        if (!response) {
          throw primaryError;
        }
      }

      console.log("User posts response:", response?.data);
      console.log("Used endpoint:", usedEndpoint);
      
      // Handle different response structures
      const userPosts = response?.data?.posts || response?.data?.data || response?.data || [];
      
      set({ userPosts, loading: false });
    } catch (err: any) {
      console.error("Get user posts error:", err);
      console.error("Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers,
      });
      
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch user posts";
      set({ error: errorMessage, loading: false, userPosts: [] });
    }
  },

  createPost: async (title: string, content: string) => {
    set({ loading: true, error: null });
    try {
      console.log("Creating post:", { title, content });
      const response = await axios.post(
        `${backendUrl}/api/posts`,
        { title, content },
        { withCredentials: true }
      );

      console.log("Create post response:", response.data);

      if (response.status !== 201 && response.status !== 200) {
        throw new Error(`Failed to create post: ${response.status}`);
      }

      const newPost = response.data.post || response.data;
      
      set((state) => ({
        posts: [newPost, ...state.posts],
        userPosts: [newPost, ...state.userPosts], // Also add to user posts
        loading: false,
      }));
    } catch (error: any) {
      console.error("Post creation failed:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create post";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  updatePost: async (id: string, title: string, content: string) => {
    set({ loading: true, error: null });
    try {
      console.log("Updating post:", { id, title, content });
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
    } catch (error: any) {
      console.error("Post update failed:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update post";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  deletePost: async (id: string) => {
    set({ loading: true, error: null });
    try {
      console.log("Deleting post:", id);
      await axios.delete(`${backendUrl}/api/posts/${id}`, {
        withCredentials: true,
      });
      
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        userPosts: state.userPosts.filter((post) => post._id !== id),
        loading: false,
      }));
      
      console.log("Post deleted successfully");
    } catch (err: any) {
      console.error("Delete post error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete post";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));