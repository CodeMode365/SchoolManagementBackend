import type { AdminSchemaType } from '@/types/model';
import { Schema, model } from 'mongoose';

const adminSchema = new Schema<AdminSchemaType>(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
    adminLevel: {
      type: String,
      enum: ['Admin', 'SubAdmin'],
      default: 'Admin',
    },
  },
  { timestamps: true }
);

const Admin = model('Admin', adminSchema);

export default Admin;
