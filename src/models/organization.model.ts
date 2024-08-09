import type { OrganizationSchemaType } from '@/types/model';
import { model, Schema } from 'mongoose';

const organizationSchema = new Schema<OrganizationSchemaType>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: [{
      type: String,
      required: true,
    }],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"]
    },
    urls: [
      // has many social links
      {
        title: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

const Organization = model('Organization', organizationSchema);

export default Organization;
