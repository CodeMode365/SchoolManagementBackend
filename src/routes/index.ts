import { default as AuthRoute } from './auth.route';
import { default as StudentRoute } from './student.route';
import { default as ParentRoute } from './parent.route';
import { default as AttendanceRoute } from './attendance.route';
import { default as ApiLogRoute } from './apiLog.route';
import { default as RoleRoute } from './role.route';
import { Router } from 'express';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/students', StudentRoute);
router.use('/parents', ParentRoute);
router.use('/attendances', AttendanceRoute);
router.use('/apiLogs', ApiLogRoute);
router.use('/roles', RoleRoute);

export default router;
