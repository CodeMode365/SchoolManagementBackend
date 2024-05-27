import type { AdminType } from "@/types/model";
import { Schema, model } from "mongoose";

const adminSchema = new Schema<AdminType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);

export default Admin;
