import { RoleController } from '@/controller';
import { cacheMiddleware } from '@/middleware';
import { Router } from 'express';

const router = Router();

// Basic CRUD operations
router.get('/all', cacheMiddleware, RoleController.getAllRoles);
router.get('/by-name/:roleName', RoleController.getRoleByName);
router.post('/add', RoleController.createRole);
router.patch('/update/:roleId', RoleController.updateRole);
router.delete('/remove/:roleId', RoleController.removeRole);

export default router;
