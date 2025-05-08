import express from "express";
import { createUser } from "@/controllers/index.ts";

const router = express.Router();

router.post("/", createUser);

export default router;
