import { Schema, model } from 'mongoose';
import { GenderType } from '@/config/enums.config';
import type { ParentSchemaType } from '@/types/model'; // Assuming you have defined ParentType in your types

const parentSchema = new Schema<ParentSchemaType>(
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
    // children: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Student',
    //   },
    // ],
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

const Parent = model('Parent', parentSchema);

export default Parent;
