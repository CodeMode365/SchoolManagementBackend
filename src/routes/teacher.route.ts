import { vars } from '@/config';
import { AccountType } from '@/config/enums.config';
import { TeacherController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.teacher;

router.get(
  '/all/:orgId',
  can([AccountType.ADMIN, AccountType.SUPER_ADMIN]),
  cacheMiddleware.getCache(cacheKey),
  TeacherController.getAll
);
// router.get('/:teacherId');
// router.delete('/:teacherId');
// router.patch('/:teacherId');

export default router;
