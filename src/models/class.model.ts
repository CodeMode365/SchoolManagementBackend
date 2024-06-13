import { Schema, model } from 'mongoose';
import type { ClassSchemaType } from '@/types/model';

const classSchema = new Schema<ClassSchemaType>(
  {
    className: String,
    section: {
      type: String,
      required: false,
    },
    monitor: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    classTeacher: {
      //has one class teacher
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    organization: {
      //belongs to one organization
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
  },
  { timestamps: true }
);

// Create model
const Class = model('Class', classSchema);

export default Class;
