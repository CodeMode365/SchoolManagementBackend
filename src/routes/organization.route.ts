import { AccountType } from '@/config/enums.config';
import { OrganizationController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { vars } from '@/config';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.organizations;

router.get(
  '/all',
  can(AccountType.SUPER_ADMIN),
  cacheMiddleware.getCache(cacheKey),
  OrganizationController.getAll
);

router.post(
  '/add',
  can(AccountType.SUPER_ADMIN),
  cacheMiddleware.clearCache(cacheKey),
  OrganizationController.create
);

router.delete(
  '/remove/:orgId',
  can(AccountType.SUPER_ADMIN),
  cacheMiddleware.clearCache(cacheKey),
  OrganizationController.remove
);

export default router;
