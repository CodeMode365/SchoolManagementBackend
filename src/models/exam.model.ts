import { ExamType } from '@/config/enums.config';
import type { ExamSchemaType } from '@/types/model';
import { model, Schema } from 'mongoose';

const examSchema = new Schema<ExamSchemaType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    examType: {
      type: String,
      enum: ExamType,
      default: ExamType.EXAM,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true }
);

const Exam = model('Exam', examSchema);

export default Exam;
