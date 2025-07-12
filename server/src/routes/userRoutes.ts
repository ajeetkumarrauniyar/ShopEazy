import express from "express";
import { createUser } from "@/controllers/index.ts";
import { logger } from "@/utils/index.ts";
import { prisma } from "@/config/index.ts";
import { asyncHandler } from "@/utils/asyncHandlerUtil.ts";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", createUser);

router.get(
  "/",
  asyncHandler(async () => {
    const allUsers = await prisma.user.findMany();
    logger.info("Fetched all users");
    return allUsers;
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      res.status(404);
      throw new Error("User not found");
    }
    logger.info(`Fetched user with ID: ${userId}`);
    return user;
  }),
);

export default router;
