import mongoose from 'mongoose';
import { EnumVar } from '@/config';
import { Role } from '@/models';
import type { RoleType } from '@/types/model';
const { AccountType } = EnumVar;

const roleData: ({ _id: mongoose.Types.ObjectId } | RoleType)[] = [
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0884'),
    name: AccountType.SUPER_ADMIN,
    description: 'Highest level of authority in the whole system',
    permissions: [
      '6656c700233e2d845c8a0f04', // student read
      '6656c700233e2d845c8a0f05', //student write
      '6656c700233e2d845c8a0f06', //student update
      '6656c700233e2d845c8a0f07', //student delete
      '6656c700233e2d845c8a0f08', //teacher read
      '6656c700233e2d845c8a0f09', //teacher write
      '6656c700233e2d845c8a0f0a', //teacher update
      '6656c700233e2d845c8a0f0b', //teacher delete
      '6656c700233e2d845c8a0f0c', //parent read
      '6656c700233e2d845c8a0f0d', //parent write
      '6656c700233e2d845c8a0f0e', //parent update
      '6656c700233e2d845c8a0f0f', //parent delete
      '6656c700233e2d845c8a0f10', //course read
      '6656c700233e2d845c8a0f11', //course write
      '6656c700233e2d845c8a0f12', //course update
      '6656c700233e2d845c8a0f13', //course delete
      '6656c700233e2d845c8a0f14', //class read
      '6656c700233e2d845c8a0f15', //class write
      '6656c700233e2d845c8a0f16', //class update
      '6656c700233e2d845c8a0f17', //class delete
      '6656c700233e2d845c8a0f18', //attendance read
      '6656c700233e2d845c8a0f19', //attendance write
      '6656c700233e2d845c8a0f1a', //attendance update
      '6656c700233e2d845c8a0f1b', //attendance delete
      '6656c700233e2d845c8a0f1c', //grade read
      '6656c700233e2d845c8a0f1d', //grade write
      '6656c700233e2d845c8a0f1e', //grade update
      '6656c700233e2d845c8a0f1f', //grade delete
      '6656c700233e2d845c8a0f20', //exam read
      '6656c700233e2d845c8a0f21', //exam write
      '6656c700233e2d845c8a0f22', //exam update
      '6656c700233e2d845c8a0f23', //exam delete
      '6656c700233e2d845c8a0f24', //logs read
      '6656c700233e2d845c8a0f25', //logs write
      '6656c700233e2d845c8a0f26', //logs update
      '6656c700233e2d845c8a0f27', //logs delete
      '6656c700233e2d845c8a0f28', //bill read
      '6656c700233e2d845c8a0f29', //bill write
      '6656c700233e2d845c8a0f2a', //bill update
      '6656c700233e2d845c8a0f2b', //bill delete
      '6656c700233e2d845c8a0f2c', //event read
      '6656c700233e2d845c8a0f2d', //event write
      '6656c700233e2d845c8a0f2e', //event update
      '6656c700233e2d845c8a0f2f', //event delete
      '6656c700233e2d845c8a0f30', //group read
      '6656c700233e2d845c8a0f31', //group write
      '6656c700233e2d845c8a0f32', //group update
      '6656c700233e2d845c8a0f33', //group delete
      '6656c700233e2d845c8a0f34', //organization read
      '6656c700233e2d845c8a0f35', //organization write
      '6656c700233e2d845c8a0f36', //organization update
      '6656c700233e2d845c8a0f37', //organization delete
      '6656c700233e2d845c8a0f38', //user read
      '6656c700233e2d845c8a0f39', //user write
      '6656c700233e2d845c8a0f3a', //user update
      '6656c700233e2d845c8a0f3b', //user delete
      '6656c700233e2d845c8a0f3c', //staff read
      '6656c700233e2d845c8a0f3d', //staff write
      '6656c700233e2d845c8a0f3e', //staff update
      '6656c700233e2d845c8a0f3f', //staff delete
      '6656c700233e2d845c8a0f40', //admin read
      '6656c700233e2d845c8a0f41', //admin write
      '6656c700233e2d845c8a0f42', //admin update
      '6656c700233e2d845c8a0f43', //admin delete
    ],
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0885'),
    name: AccountType.ADMIN,
    description: 'Highest level of Authority in an organization',
    permissions: [
      '6656c700233e2d845c8a0f38', //user read
      '6656c700233e2d845c8a0f39', //user write
      '6656c700233e2d845c8a0f3a', //user update
      '6656c700233e2d845c8a0f3b', //user delete
      '6656c700233e2d845c8a0f3c', //staff read
      '6656c700233e2d845c8a0f3d', //staff write
      '6656c700233e2d845c8a0f3e', //staff update
      '6656c700233e2d845c8a0f3f', //staff delete
      '6656c700233e2d845c8a0f28', //bill read
      '6656c700233e2d845c8a0f29', //bill write
      '6656c700233e2d845c8a0f2a', //bill update
      '6656c700233e2d845c8a0f2b', //bill delete
      '6656c700233e2d845c8a0f2c', //event read
      '6656c700233e2d845c8a0f2d', //event write
      '6656c700233e2d845c8a0f2e', //event update
      '6656c700233e2d845c8a0f2f', //event delete
      '6656c700233e2d845c8a0f30', //group read
      '6656c700233e2d845c8a0f31', //group write
      '6656c700233e2d845c8a0f32', //group update
      '6656c700233e2d845c8a0f33', //group delete
      '6656c700233e2d845c8a0f04', //student read
      '6656c700233e2d845c8a0f05', //student write
      '6656c700233e2d845c8a0f06', //student update
      '6656c700233e2d845c8a0f07', //student delete
      '6656c700233e2d845c8a0f08', //teacher read
      '6656c700233e2d845c8a0f09', //teacher write
      '6656c700233e2d845c8a0f0a', //teacher update
      '6656c700233e2d845c8a0f0b', //teacher delete
      '6656c700233e2d845c8a0f0c', //parent read
      '6656c700233e2d845c8a0f0d', //parent write
      '6656c700233e2d845c8a0f0e', //parent update
      '6656c700233e2d845c8a0f0f', //parent delete
      '6656c700233e2d845c8a0f10', //course read
      '6656c700233e2d845c8a0f11', //course write
      '6656c700233e2d845c8a0f12', //course update
      '6656c700233e2d845c8a0f13', //course delete
      '6656c700233e2d845c8a0f14', //class read
      '6656c700233e2d845c8a0f15', //class write
      '6656c700233e2d845c8a0f16', //class update
      '6656c700233e2d845c8a0f17', //class delete
      '6656c700233e2d845c8a0f18', //attendance read
      '6656c700233e2d845c8a0f19', //attendance write
      '6656c700233e2d845c8a0f1a', //attendance update
      '6656c700233e2d845c8a0f1b', //attendance delete
      '6656c700233e2d845c8a0f1c', //grade read
      '6656c700233e2d845c8a0f1d', //grade write
      '6656c700233e2d845c8a0f1e', //grade update
      '6656c700233e2d845c8a0f1f', //grade delete
      '6656c700233e2d845c8a0f20', //exam read
      '6656c700233e2d845c8a0f21', //exam write
      '6656c700233e2d845c8a0f22', //exam update
      '6656c700233e2d845c8a0f23', //exam delete
      '6656c700233e2d845c8a0f34', //organization read
      '6656c700233e2d845c8a0f40', //admin read
    ],
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0886'),
    name: AccountType.SUB_ADMIN,
    description: 'Second highest level of authority in an organization',
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0887'),
    name: AccountType.TEACHER,
    description: 'Registered teacher',
    permissions: [
      '6656c700233e2d845c8a0f04', //read student
      '6656c700233e2d845c8a0f0c', //read parent
      '6656c700233e2d845c8a0f20', //exam read
      '6656c700233e2d845c8a0f21', //exam write
    ],
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0888'),
    name: AccountType.PARENT,
    description: 'Registered parent',
    permissions: [
      '6656c700233e2d845c8a0f04', //student read
      '6656c700233e2d845c8a0f05', //student write
      '6656c700233e2d845c8a0f06', //student update
      '6656c700233e2d845c8a0f0c', //parent read
      '6656c700233e2d845c8a0f0d', //parent write
      '6656c700233e2d845c8a0f0e', //parent update
      '6656c700233e2d845c8a0f08', //teacher read
      '6656c700233e2d845c8a0f0a', //teacher update
      '6656c700233e2d845c8a0f10', //course read
      '6656c700233e2d845c8a0f11', //course write
      '6656c700233e2d845c8a0f12', //course update
      '6656c700233e2d845c8a0f18', //attendance read
      '6656c700233e2d845c8a0f19', //attendance write
      '6656c700233e2d845c8a0f1a', //attendance update
    ],
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0889'),
    name: AccountType.STAFF,
    description: 'Registered staff',
    permissions: [],
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b080a'),
    name: AccountType.STUDENT,
    description: 'Registered Student',
    permissions: [
      '6656c700233e2d845c8a0f04', //read student
    ],
  },
];

export default roleData;
