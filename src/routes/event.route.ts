import { vars } from '@/config';
import { AccountType } from '@/config/enums.config';
import { EventController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.events;

router.get(
  '/all/:orgId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN, AccountType.SUB_ADMIN]),
  cacheMiddleware.getCache(cacheKey),
  EventController.getAll
);

router.post(
  '/add',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN, AccountType.SUB_ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  EventController.add
);
router.patch(
  '/update/:eventId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN, AccountType.SUB_ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  EventController.update
);
router.delete(
  '/remove/:eventId',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN, AccountType.SUB_ADMIN]),
  cacheMiddleware.clearCache(cacheKey),
  EventController.remove
);

export default router;
