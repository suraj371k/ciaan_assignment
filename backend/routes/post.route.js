import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getUserPosts,
} from "../controllers/post.controller.js";
import authenticate from "../middleware/authenticate.middleware.js";

const router = express.Router();

// Create a new post (protected)
router.post("/", authenticate, createPost);

// Get all posts (public)
router.get("/",  getAllPosts);

// Get posts by the authenticated user (protected)
router.get("/me", authenticate, getUserPosts);

// Update a post (protected)
router.put("/:id", authenticate, updatePost);

// Delete a post (protected)
router.delete("/:id", authenticate, deletePost);

export default router;
