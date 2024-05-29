import mongoose from 'mongoose';
import { HashUtils } from '@/utils';
import { AccountStatusType } from '@/config/enums.config';
import type { UserType } from '@/types/model';

const userData: ({ _id: mongoose.Types.ObjectId } | UserType)[] = [
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0883'),
    username: 'PabinTester',
    email: 'pabintester@gmail.com',
    password: HashUtils.hashPassword('123456'),
    roles: ['605f6c9a9a13e72a015b0884'],
    status: AccountStatusType.ACTIVE,
  },
];

export default userData;
