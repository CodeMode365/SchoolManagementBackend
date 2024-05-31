import mongoose from 'mongoose';
import { HashUtils } from '@/utils';
import { AccountStatusType } from '@/config/enums.config';
import type { UserSchemaType } from '@/types/model';

const userData: ({ _id: mongoose.Types.ObjectId } | UserSchemaType)[] = [
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0883'),
    username: 'PabinTester',
    email: 'pabintester@gmail.com',
    password: HashUtils.hashPassword('123456'),
    roles: [new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0884')],
    status: AccountStatusType.ACTIVE,
  },
  {
    _id: new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0884'),
    username: 'Pabin',
    email: 'pabin@gmail.com',
    password: HashUtils.hashPassword('123456'),
    roles: [new mongoose.Types.ObjectId('605f6c9a9a13e72a015b0885')],
    status: AccountStatusType.ACTIVE,
  },
];

export default userData;
