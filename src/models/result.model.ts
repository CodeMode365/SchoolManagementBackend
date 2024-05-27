import mongoose, { Schema, Document } from "mongoose";
import type { ResultType } from "@/types/model";
import { ExamType, SubjectType } from "@/constants/enums";

const resultSchema = new Schema<ResultType>(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    marks: [
      {
        subject: {
          type: String,
          enum: SubjectType,
          required: true,
        },
        passMark: { type: Number, required: true },
        fullMark: { type: Number, required: true },
        obtainedMark: { type: Number, required: true },
      },
    ],
    grade: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
    examDate: {
      type: Date,
      required: true,
    },
    examType: {
      type: String,
      enum: ExamType,
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
