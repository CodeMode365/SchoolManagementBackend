import { Schema, model } from 'mongoose';
import type { UserSessionSchemaType } from '@/types/model';

const sessionSchema = new Schema<UserSessionSchemaType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Session = model('Session', sessionSchema);

export default Session;
