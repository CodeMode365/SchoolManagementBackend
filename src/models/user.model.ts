import { UserType } from "@/constants/enums";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      require: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserType,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: ["Parent", "Teacher", "Admin"],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
