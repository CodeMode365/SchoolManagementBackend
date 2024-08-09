import { vars } from '@/config';
import { ApiLogController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';
import { AccountType } from '@/config/enums.config';

const router = Router();
const cacheKey = vars.cacheKey.logs; // Define the appropriate cache key for apiLogs

router.get(
  '/all',
  can([AccountType.SUPER_ADMIN]),
  cacheMiddleware.getCache(cacheKey),
  ApiLogController.getAll
);

router.patch(
  '/update/:logId',
  can([AccountType.SUPER_ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ApiLogController.update
);

router.delete(
  '/remove/:logId',
  can([AccountType.SUPER_ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  ApiLogController.remove
);

export default router;
