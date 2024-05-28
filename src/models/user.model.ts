import type { UserType } from '@/types/model';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<UserType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      require: false,
    },
    lastName: {
      type: String,
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
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
