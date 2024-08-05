import { OrganizationController } from '@/controller';
import { Router } from 'express'

const router = Router()


router.get('/all', OrganizationController.getAll);
router.post('/add', OrganizationController.create)
router.delete("/remove/:orgId", OrganizationController.remove)

export default router;
