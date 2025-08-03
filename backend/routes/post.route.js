import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  getUserPosts,
} from "../controllers/post.controller.js";
import authenticate from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.post("/", authenticate, createPost);

router.get("/",  getAllPosts);

router.get("/me", authenticate, getUserPosts);


router.delete("/:id", authenticate, deletePost);

export default router;
