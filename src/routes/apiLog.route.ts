import { vars } from '@/config';
import { ApiLogController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';
import { PERMISSIONS } from '@/config/constants.config';

const router = Router();
const cacheKey = vars.cacheKey.logs; // Define the appropriate cache key for apiLogs

router.get(
  '/all',
  // can(PERMISSIONS.LOGS.READ),
  cacheMiddleware.getCache(cacheKey),
  ApiLogController.getAll
);

router.patch(
  '/update/:logId',
  can(PERMISSIONS.LOGS.UPDATE),
  cacheMiddleware.clearCache(cacheKey),
  ApiLogController.update
);

router.delete(
  '/remove/:logId',
  can(PERMISSIONS.LOGS.DELETE),
  cacheMiddleware.clearCache(cacheKey),
  ApiLogController.remove
);

export default router;
