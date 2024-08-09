import { vars } from '@/config';
import { AccountType } from '@/config/enums.config';
import { TransactionController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.organizations;

router.get(
  '/all/:orgId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.getCache(cacheKey),
  TransactionController.getAll
);
router.get(
  '/:transactionId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.getCache(cacheKey),
  TransactionController.getById
);
router.post(
  '/add',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  TransactionController.create
);
router.patch(
  '/update/:transactionId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  TransactionController.update
);
router.delete(
  '/remove/:transactionId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  TransactionController.remove
);

export default router;
