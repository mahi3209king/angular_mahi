import mongoose, { Schema, Document, Types } from "mongoose";
import { AgeGroup } from "./User";

export type Category =
  | "Career"
  | "Love"
  | "Marriage"
  | "Money"
  | "Health"
  | "Regret"
  | "General";

export interface IComment {
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  title: string;
  content: string;
  category: Category;
  ageGroup: AgeGroup;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Career", "Love", "Marriage", "Money", "Health", "Regret", "General"]
    },
    ageGroup: { type: String, required: true, enum: ["20s", "30s", "40s", "50+"] },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema]
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IPost>("Post", PostSchema);
