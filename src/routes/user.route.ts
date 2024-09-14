import { AccountType } from '@/config/enums.config';
import { UserController } from '@/controller';
import { can } from '@/middleware';
import { Router } from 'express';

const router = Router();

router.get(
  '/info/:userId',
  can([AccountType.ADMIN, AccountType.SUPER_ADMIN, AccountType.SUB_ADMIN]),
  UserController.getUserInfo
);

export default router;
