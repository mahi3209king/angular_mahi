import express from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, commentOnPost);

export default router;
