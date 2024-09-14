import { Schema, model } from 'mongoose';
import type { ResultSchemaType } from '@/types/model';
// import { ExamType } from '@/config/enums.config';

const resultSchema = new Schema<ResultSchemaType>(
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
          type: Schema.Types.ObjectId,
          ref: 'Subject',
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
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
    },
  },
  { timestamps: true }
);

const Result = model('Result', resultSchema);

export default Result;
