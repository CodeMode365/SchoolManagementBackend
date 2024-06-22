import type { ComplaintSchemaType } from '@/types/model';
import { Schema, model } from 'mongoose';

const complaintSchema = new Schema<ComplaintSchemaType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
});

const Complaint = model('Complaint', complaintSchema);

export default Complaint;
