import { AccountStatusType } from '@/config/enums.config';
import type { UserSchemaType } from '@/types/model';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<UserSchemaType>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
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
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 'text', email: 'text' });

const User = model('User', userSchema);

export default User;
