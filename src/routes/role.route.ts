import { vars } from '@/config';
import { PERMISSIONS } from '@/config/constants.config';
import { RoleController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.roles;

router.get(
  '/all',
  can(PERMISSIONS.ROLE.READ),
  cacheMiddleware.getCache(cacheKey),
  RoleController.getAll
);
router.get(
  '/:roleId',
  can(PERMISSIONS.ROLE.READ),
  cacheMiddleware.getCache(cacheKey),
  RoleController.getById
);
router.post(
  '/add',
  can(PERMISSIONS.ROLE.WRITE),
  cacheMiddleware.clearCache(cacheKey),
  RoleController.create
);
router.patch(
  '/update/:roleId',
  can(PERMISSIONS.ROLE.UPDATE),
  cacheMiddleware.clearCache(cacheKey),
  RoleController.update
);
router.delete(
  '/remove/:roleId',
  can(PERMISSIONS.ROLE.DELETE),
  cacheMiddleware.clearCache(cacheKey),
  RoleController.remove
);

export default router;
