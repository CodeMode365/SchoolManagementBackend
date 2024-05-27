import { Schema, model } from "mongoose";
import { GenderType } from "@/constants/enums";
import type { TeacherType } from "@/types/model";

const teacherSchema = new Schema<TeacherType>(
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
      required: false,
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
    joinedDate: Date,
    education: String,
    experience: String,
  },

  { timestamps: true }
);

const Teacher = model("Teacher", teacherSchema);

export default Teacher;
