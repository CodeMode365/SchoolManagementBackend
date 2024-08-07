import { EventController } from '@/controller';
import { can } from '@/middleware';
import { Router } from 'express';

const router = Router();

router.get('/all', can(''), EventController.get);
router.post('/add', can(''), EventController.add);
router.patch('/update/:eventId', EventController.update);
router.delete('/remove/:eventId', EventController.remove);

export default router;
