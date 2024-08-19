import type { SubjectSchemaType } from '@/types/model';
import mongoose, { model, Schema } from 'mongoose';

const subjectSchema = new mongoose.Schema<SubjectSchemaType>(
  {
    name: {
      type: String,
      required: [true, 'Please provide subject name'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Please provide organization'],
    },
    book: {
      name: String,
      publication: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    teacher: {
      ref: 'Teacher',
      type: Schema.Types.ObjectId,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

subjectSchema.index({ name: 'text' });

const Subject = model<SubjectSchemaType>('Subject', subjectSchema);

export default Subject;
