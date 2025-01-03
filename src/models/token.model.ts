import type { TokenSchemaType } from '@/types/model';
import { Schema, model } from 'mongoose';

const tokenSchema = new Schema<TokenSchemaType>(
  {
    authToken: {
      type: String,
      required: true,
    },
    refreshToken: {
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

const Token = model('Token', tokenSchema);

export default Token;
