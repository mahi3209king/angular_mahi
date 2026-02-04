import mongoose, { Schema, Document } from "mongoose";

export type AgeGroup = "20s" | "30s" | "40s" | "50+";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  ageGroup: AgeGroup;
  bio?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    ageGroup: { type: String, required: true, enum: ["20s", "30s", "40s", "50+"] },
    bio: { type: String, default: "" }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IUser>("User", UserSchema);
