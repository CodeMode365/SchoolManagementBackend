import type { UserType } from '@/types/model';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<UserType>(
  {
    username: { type: String, required: true },
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
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
