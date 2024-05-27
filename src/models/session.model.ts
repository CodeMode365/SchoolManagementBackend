import mongoose, { Schema, Document } from "mongoose";
import type { UserSessionType } from "@/types/model";

const sessionSchema = new Schema<UserSessionType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ["User", "Parent", "Teacher"],
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
