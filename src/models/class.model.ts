import mongoose, { Schema } from 'mongoose';
import type { ClassType } from '@/types/model';

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
      //has one class teacher
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    organization: {
      //belongs to one organization
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    students: [
      //has many students
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
);

// Create model
const Class = mongoose.model('Class', classSchema);

export default Class;
