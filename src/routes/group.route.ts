import { vars } from '@/config';
import { GroupController } from '@/controller';
import { Router } from 'express';

const cacheKey = vars.cacheKey.groups
const router = Router();

// Basic CRUD operations
router.get('/all', cacheKey(cacheKey), GroupController.getAll);
router.get('/:groupId', cacheKey(cacheKey), GroupController.getById);
router.post('/add', cacheKey(cacheKey), GroupController.create);
router.patch('/update/:groupId', cacheKey(cacheKey), GroupController.update);
router.delete('/remove/:groupId', cacheKey(cacheKey), GroupController.remove);

export default router;
