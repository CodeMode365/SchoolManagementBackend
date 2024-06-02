import { Schema, model } from 'mongoose';
import { GenderType } from '@/config/enums.config';
import type { TeacherSchemaType } from '@/types/model';

const teacherSchema = new Schema<TeacherSchemaType>(
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
    gender: {
      type: String,
      enum: GenderType,
      required: true,
    },
    address: {
      city: String,
      tole: String,
    },
    phone: String,
    email: String,
    joinedDate: Date,
    education: String,
    experience: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },

  { timestamps: true }
);

const Teacher = model('Teacher', teacherSchema);

export default Teacher;
