import express from "express";
import { register, loginUser, logoutUser, getUserProfile } from "../controllers/user.controller.js";
import authenticate from "../middleware/authenticate.middleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", logoutUser);

// Get user profile (protected)
router.get("/profile", authenticate, getUserProfile);

export default router;
