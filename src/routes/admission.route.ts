import { vars } from '@/config';
import { AccountType } from '@/config/enums.config';
import { AdmissionController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.admissions;

// Basic CRUD operations
router.get(
  '/all',
  can([AccountType.SUPER_ADMIN, AccountType.ADMIN]),
  cacheMiddleware.getCache(cacheKey),
  AdmissionController.getAll
);
// router.get('/:admissionId', AdmissionController.getById);
// router.post('/add', AdmissionController.add);
// router.patch('/update/:admissionId', AdmissionController.update);
// router.delete('/remove/:admissionId', AdmissionController.remove);

export default router;
