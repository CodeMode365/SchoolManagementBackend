import { ExamController } from '@/controller';
import { can } from '@/middleware';
import { Router } from 'express';

const router = Router();

router.get('/all', can(''), ExamController.getAll);
router.get('/:examId', can(''), ExamController.getById);
router.post('/add', can(''), ExamController.create);
router.patch('/update/:examId', can(''), ExamController.update);
router.delete('/remove/:examId', can(''), ExamController.remove);

export default router;
