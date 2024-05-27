import mongoose, { Schema, Document } from "mongoose";
import type { ClassType } from "@/types/model";

const classSchema = new Schema<ClassType>(
  {
    className: String,
    section: {
      type: String,
      required: false,
    },
    monitor: {
      type: String,
      required: false,
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

// Create model
const Class = mongoose.model("Class", classSchema);

export default Class;
