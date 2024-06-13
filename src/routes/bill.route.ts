import { BillController } from '@/controller';
import { Router } from 'express';

const router = Router();

router.get('/all', BillController.getAll);
router.post('/add', BillController.create);
router.patch('/update/:billId', BillController.update);
router.delete('/delete/:billId', BillController.remove);

export default router;
