import { ParentController } from '@/controller';
import { Router } from 'express';

const router = Router();

router.get('/all', ParentController.getAll);
router.get('/by-org/:orgId', ParentController.parentsByOrg);
router.get('/get-children/:parentId', ParentController.getChildren);
router.post('/add', ParentController.add);
// router.patch('/update/:parentId');
router.delete('/remove/:parentId', ParentController.remove);

//Bulk management
router.post('/bulk-add');
router.delete('/bulk-delete');

export default router;
