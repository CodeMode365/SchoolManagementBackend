import { Schema, model } from 'mongoose';
import { GenderType } from '@/constants/enums';
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
    gender: GenderType,
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
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  { timestamps: true }
);

const Student = model('Student', studentSchema);

export default Student;
