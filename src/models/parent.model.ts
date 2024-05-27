import mongoose, { Schema, Document } from "mongoose";
import { GenderType } from "@/constants/enums";
import type { ParentType } from "@/types/model"; // Assuming you have defined ParentType in your types

const parentSchema = new Schema<ParentType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: GenderType,
    address: {
      city: String,
      tole: String,
    },
    contact: {
      phone: String,
      email: String,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Reference to Student model
      },
    ],
  },
  { timestamps: true }
);

// Create model
const Parent = mongoose.model("Parent", parentSchema);

export default Parent;
