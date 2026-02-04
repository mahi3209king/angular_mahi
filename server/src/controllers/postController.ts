import asyncHandler from "express-async-handler";
import Post from "../models/Post";
import { AuthRequest } from "../middleware/authMiddleware";

export const getPosts = asyncHandler(async (req, res) => {
  const { ageGroup, category } = req.query;
  const filter: Record<string, string> = {};

  if (ageGroup && typeof ageGroup === "string") {
    filter.ageGroup = ageGroup;
  }
  if (category && typeof category === "string") {
    filter.category = category;
  }

  const posts = await Post.find(filter)
    .populate("author", "name ageGroup")
    .sort({ createdAt: -1 });
  res.json(posts);
});

export const createPost = asyncHandler(async (req: AuthRequest, res) => {
  const { title, content, category, ageGroup } = req.body;

  if (!title || !content || !category || !ageGroup) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const post = await Post.create({
    title,
    content,
    category,
    ageGroup,
    author: req.userId
  });

  res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req: AuthRequest, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (post.author.toString() !== req.userId) {
    res.status(403);
    throw new Error("Not authorized to edit this post");
  }

  const { title, content, category, ageGroup } = req.body;
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.category = category ?? post.category;
  post.ageGroup = ageGroup ?? post.ageGroup;

  const updatedPost = await post.save();
  res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req: AuthRequest, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (post.author.toString() !== req.userId) {
    res.status(403);
    throw new Error("Not authorized to delete this post");
  }

  await post.deleteOne();
  res.json({ message: "Post removed" });
});

export const likePost = asyncHandler(async (req: AuthRequest, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const userId = req.userId as string;
  const hasLiked = post.likes.some((like) => like.toString() === userId);

  if (hasLiked) {
    post.likes = post.likes.filter((like) => like.toString() !== userId);
  } else {
    post.likes.push(userId as never);
  }

  await post.save();
  res.json({ likes: post.likes.length });
});

export const commentOnPost = asyncHandler(async (req: AuthRequest, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  post.comments.unshift({
    user: req.userId as string,
    text,
    createdAt: new Date()
  });

  await post.save();
  res.status(201).json(post.comments);
});
