import { Router } from 'express';
import { ApiLogController } from '@/controller';

const router = Router();

router.get('/all', ApiLogController.getAll);
// router.get('/by-org/:orgId');

export default router;
