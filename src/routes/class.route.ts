import { Router } from 'express';
import { ClassController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { vars } from '@/config';
import { AccountType } from '@/config/enums.config';

const router = Router();
const cacheKey = vars.cacheKey.classes;

// Basic CRUD operations
router.get(
  '/all/:orgId',
  can([AccountType.SUB_ADMIN, AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ClassController.getAll
);
router.get(
  '/:classId',
  can([AccountType.SUB_ADMIN, AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ClassController.getById
);
router.post(
  '/add',
  can([AccountType.SUB_ADMIN, AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ClassController.create
);
router.patch(
  '/update/:classId',
  can([AccountType.SUB_ADMIN, AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ClassController.update
);
router.delete(
  '/remove/:classId',
  can([AccountType.SUB_ADMIN, AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ClassController.remove
);

export default router;
