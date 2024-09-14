import { GenderType } from '@/config/enums.config';
import type { StudentSchemaType } from '@/types/model';
import mongoose from 'mongoose';

const studentData: ({ _id: mongoose.Types.ObjectId } | StudentSchemaType)[] = [
  {
    _id: new mongoose.Types.ObjectId('605f7d1a9a13e82b015b0881'),
    firstName: 'John',
    middleName: 'A.',
    lastName: 'Doe',
    dateOfBirth: new Date('2010-05-14T00:00:00.000Z'),
    gender: GenderType.MALE,
    address: {
      city: 'New York',
      tole: 'Brooklyn',
    },
    phone: '123-456-7890',
    parents: [new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d12345')],
    class: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d67890'),
    section: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d54321'),
    organization: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d09876'),
    user: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d23456'),
  },
  {
    firstName: 'Jane',
    middleName: 'B.',
    lastName: 'Smith',
    dateOfBirth: new Date('2011-09-22T00:00:00.000Z'),
    gender: GenderType.FEMALE,
    address: {
      city: 'Los Angeles',
      tole: 'Hollywood',
    },
    phone: '987-654-3210',
    parents: [new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d65432')],
    class: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d43210'),
    section: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d21098'),
    organization: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d87654'),
    user: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d76543'),
  },
  {
    firstName: 'Michael',
    middleName: 'C.',
    lastName: 'Johnson',
    dateOfBirth: new Date('2009-02-11T00:00:00.000Z'),
    gender: GenderType.MALE,
    address: {
      city: 'Chicago',
      tole: 'Lincoln Park',
    },
    phone: '555-555-5555',
    parents: [new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d32109')],
    class: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d10987'),
    section: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d98765'),
    organization: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d54321'),
    user: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d65432'),
  },
  {
    firstName: 'Emily',
    middleName: 'D.',
    lastName: 'Williams',
    dateOfBirth: new Date('2012-07-19T00:00:00.000Z'),
    gender: GenderType.FEMALE,
    address: {
      city: 'Houston',
      tole: 'Midtown',
    },
    phone: '321-654-0987',
    parents: [new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d89012')],
    class: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d21098'),
    section: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d54321'),
    organization: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d87654'),
    user: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d76543'),
  },
  {
    firstName: 'David',
    middleName: 'E.',
    lastName: 'Brown',
    dateOfBirth: new Date('2008-11-25T00:00:00.000Z'),
    gender: GenderType.MALE,
    address: {
      city: 'San Francisco',
      tole: 'Mission District',
    },
    phone: '789-012-3456',
    parents: [new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d09876')],
    class: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d54321'),
    section: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d87654'),
    organization: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d21098'),
    user: new mongoose.Types.ObjectId('64e4f8d4f4e2fbd0f8d98765'),
  },
];

export default studentData;
