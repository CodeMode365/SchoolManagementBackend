import { can } from '@/middleware';
import { Router } from 'express';
import { AccountType } from '@/config/enums.config';
import { ChatController } from '@/controller';

const router = Router();

router.get(
  '/people',
  can([
    AccountType.ADMIN,
    AccountType.SUPER_ADMIN,
    AccountType.SUB_ADMIN,
    AccountType.PARENT,
    AccountType.TEACHER,
  ]),
  ChatController.getPeoples
);

router.get(
  '/messages/:friendId',
  can([
    AccountType.ADMIN,
    AccountType.SUPER_ADMIN,
    AccountType.SUB_ADMIN,
    AccountType.PARENT,
    AccountType.TEACHER,
  ]),
  ChatController.getMessages
);

export default router;
