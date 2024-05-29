import { AccountStatusType } from '@/config/enums.config';
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
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
      },
    ],
    status: {
      type: String,
      enum: AccountStatusType,
      default: AccountStatusType.ACTIVE,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
