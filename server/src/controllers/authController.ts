import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, ageGroup, bio } = req.body;

  if (!name || !email || !password || !ageGroup) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    ageGroup,
    bio
  });

  res.status(201).json({
    token: generateToken(user._id.toString()),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      ageGroup: user.ageGroup,
      bio: user.bio
    }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    token: generateToken(user._id.toString()),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      ageGroup: user.ageGroup,
      bio: user.bio
    }
  });
});
