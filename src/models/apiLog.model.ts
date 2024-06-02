import type { ApiLogSchemaType } from '@/types/model';
import { Schema, model } from 'mongoose';

const apiLogSchema = new Schema<ApiLogSchemaType>(
  {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    responseTime: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  { timestamps: true }
);

const ApiLog = model<ApiLogSchemaType>('ApiLog', apiLogSchema);

export default ApiLog;
