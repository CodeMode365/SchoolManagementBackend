import { Schema, model } from 'mongoose';
import { GenderType } from '@/config/enums.config';
import type { StudentType } from '@/types/model';

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
    gender: {
      type: String,
      enum: GenderType,
      required: true,
    },
    address: {
      city: String,
      tole: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    parents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Parent',
      },
    ],
    class: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Student = model('Student', studentSchema);

export default Student;
