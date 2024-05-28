import { Schema, model } from 'mongoose';
import { GenderType } from '@/config/enums.config';
import type { ParentType } from '@/types/model'; // Assuming you have defined ParentType in your types

const parentSchema = new Schema<ParentType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
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
    contact: {
      phone: String,
      email: String,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student', // Reference to Student model
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Parent = model('Parent', parentSchema);

export default Parent;
