import { ResultController } from '@/controller';
import { can } from '@/middleware';
import { Router } from 'express';

const router = Router();

router.get('/all', can(''), ResultController.getAll);
router.get('/:resultId', can(''), ResultController.getById);
router.post('/add', can(''), ResultController.create);
router.patch('/update/:resultId', can(''), ResultController.update);
router.delete('/delete/:resultId', can(''), ResultController.remove);

export default router;
