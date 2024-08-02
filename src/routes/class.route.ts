import { Router } from 'express';
import { ClassController } from '@/controller';
import { can } from '@/middleware';

const router = Router();

// Basic CRUD operations
router.get('/all', ClassController.getAll);
router.get('/:classId', ClassController.getById);
router.post('/add', ClassController.create);
router.patch('/update/:classId', ClassController.update);
router.delete('/remove/:classId', ClassController.remove);

export default router;
