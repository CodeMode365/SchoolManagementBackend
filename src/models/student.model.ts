import mongoose, { Schema, Document } from "mongoose";
import { GenderType } from "@/constants/enums";
import type { StudentType } from "@/types/model";

const studentSchema = new Schema<StudentType>(
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
    dateOfBirth: {
      type: Date,
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
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },
    grade: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
