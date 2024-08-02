import { Schema, model } from 'mongoose';
import { type UserSessionSchemaType } from '@/types/model';

const sessionSchema = new Schema<UserSessionSchemaType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    agent: String,
    browser: String,
    ip: String,
    device: String,

  },
  { timestamps: true }
);

const Session = model<UserSessionSchemaType>('Session', sessionSchema);

export default Session;

