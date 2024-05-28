import type { OrganizationType } from '@/types/model';
import { model, Schema } from 'mongoose';

const organizationSchema = new Schema<OrganizationType>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
