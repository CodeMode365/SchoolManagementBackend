import { Schema, model } from 'mongoose';
import type { ResultType } from '@/types/model';
import { ExamType, SubjectType } from '@/config/enums.config';

const resultSchema = new Schema<ResultType>(
  {
    title: String,
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
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

const Result = model('Result', resultSchema);

export default Result;
