"use client";

import PostCard from "@/components/PostCard";
import { usePostStore } from "@/store/postStore";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const PostsList = () => {
  const { posts, getPosts, loading, error, deletePost } = usePostStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      getPosts();
      toast.success("Post deleted successfully");
    } catch (err) {
      console.log("Error in deleting post", error);
    }
  };

  const formatTimeAgo = (dateInput: string | Date) => {
    const now = new Date();
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          name={post.author?.name || "Unknown"}
          timeAgo={formatTimeAgo(post.createdAt)}
          title={post.title}
          content={post.content}
          isOwner={user?._id === post.author?._id}
          onDelete={() => {
            handleDeletePost(post._id);
          }}
        />
      ))}
    </div>
  );
};

export default PostsList;
