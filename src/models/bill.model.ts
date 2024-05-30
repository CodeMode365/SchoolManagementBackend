import { FeeStatusType, PriorityType } from '@/config/enums.config';
import type { BillSchemaType } from '@/types/model';
import { model, Schema } from 'mongoose';

const billSchema = new Schema<BillSchemaType>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: FeeStatusType,
      default: FeeStatusType.UNPAID,
    },
    priority: {
      type: String,
      enum: PriorityType,
      default: PriorityType.MEDIUM,
    },
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  { timestamps: true }
);

const Bill = model('Bill', billSchema);

export default Bill;
