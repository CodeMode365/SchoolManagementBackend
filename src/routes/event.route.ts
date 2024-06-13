import { EventController } from '@/controller';
import { Router } from 'express';

const router = Router();

router.get('/all', EventController.get);
router.post('/add', EventController.add);
router.patch('/update/:eventId', EventController.update);
router.delete('/remove/:eventId', EventController.remove);

export default router;
