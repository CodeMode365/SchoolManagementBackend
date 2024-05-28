import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "1h",
    },
  },
  { timestamps: true }
);

const Token = model("Token", tokenSchema);

export default Token;
