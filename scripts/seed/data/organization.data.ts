import type { OrganizationSchemaType } from '@/types/model';
import mongoose from 'mongoose';

const organizationData: (
  | { _id: mongoose.Types.ObjectId }
  | OrganizationSchemaType
)[] = [
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e82b015b0881'),
    name: 'Test School 1.',
    address: '123 Silicon Valley, San Francisco, CA 94105',
    phone: ['+1-555-123-4567', '+1-555-987-6543'],
    email: 'contact@techinnovators.com',
    status: 'active',
    urls: [
      {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/company/tech-innovators',
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/techinnovators',
      },
      {
        title: 'Facebook',
        url: 'https://www.facebook.com/techinnovators',
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e82b015b0882'),
    name: 'Test School 2.',
    address: '123 Kathmandu Valley, Nepal',
    phone: ['+1-555-123-4567', '+1-555-987-6543'],
    email: 'contact@schooly.com',
    status: 'active',
    urls: [
      {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/company/tech-innovators',
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/techinnovators',
      },
      {
        title: 'Facebook',
        url: 'https://www.facebook.com/techinnovators',
      },
    ],
  },
];

export default organizationData;
