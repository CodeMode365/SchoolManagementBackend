import { vars } from '@/config';
import { GroupController } from '@/controller';
import { cacheMiddleware } from '@/middleware';
import { Router } from 'express';

const cacheKey = vars.cacheKey.groups;
const router = Router();

// Basic CRUD operations
router.get('/all', cacheMiddleware.getCache(cacheKey), GroupController.getAll);
router.get(
  '/:groupId',
  cacheMiddleware.getCache(cacheKey),
  GroupController.getById
);
router.post(
  '/add',
  cacheMiddleware.clearCache(cacheKey),
  GroupController.create
);
router.patch(
  '/update/:groupId',
  cacheMiddleware.clearCache(cacheKey),
  GroupController.update
);
router.delete(
  '/remove/:groupId',
  cacheMiddleware.clearCache(cacheKey),
  GroupController.remove
);

export default router;
