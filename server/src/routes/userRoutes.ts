import express from "express";
import { getUserByClerkId, getOrCreateUserByClerkId, getAllUsers, getUserById } from "@/controllers/index.ts";

const router = express.Router();

// Get user by Clerk ID
router.get("/clerk/:clerkId", getUserByClerkId);

// Get or create user by Clerk ID (for mobile sync)
router.post("/clerk/:clerkId/sync", getOrCreateUserByClerkId);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

export default router;
