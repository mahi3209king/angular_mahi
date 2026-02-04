import express from "express";
import { getUserPosts, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getUserProfile);
router.get("/:id/posts", getUserPosts);

export default router;
