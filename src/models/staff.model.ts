import type { StaffSchema } from '@/types/model';
import { Schema, model } from 'mongoose';

const staffSchema = new Schema<StaffSchema>(
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
    level: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      require: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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

const Staff = model('Staff', staffSchema);

export default Staff;
