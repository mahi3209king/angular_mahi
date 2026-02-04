import asyncHandler from "express-async-handler";
import User from "../models/User";
import Post from "../models/Post";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.params.id })
    .populate("author", "name ageGroup")
    .sort({ createdAt: -1 });
  res.json(posts);
});
