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

router.post(
  '/send-message',
  can([
    AccountType.ADMIN,
    AccountType.SUPER_ADMIN,
    AccountType.SUB_ADMIN,
    AccountType.PARENT,
    AccountType.TEACHER,
  ]),
  ChatController.sendMessage
);

router.delete(
  '/clear-chat/:friendId',
  can([AccountType.ADMIN, AccountType.SUPER_ADMIN]),
  ChatController.clearChat
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
