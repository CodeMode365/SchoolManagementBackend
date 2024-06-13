import { default as AuthRoute } from './auth.route';
import { default as StudentRoute } from './student.route';
import { default as ParentRoute } from './parent.route';
import { default as AttendanceRoute } from './attendance.route';
import { default as ApiLogRoute } from './apiLog.route';
import { default as RoleRoute } from './role.route';
import { default as EventRoute } from './event.route';
import { default as BillRoute } from './bill.route';
import { default as ClassRoute } from './class.route';
import { Router } from 'express';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/students', StudentRoute);
router.use('/parents', ParentRoute);
router.use('/attendances', AttendanceRoute);
router.use('/apiLogs', ApiLogRoute);
router.use('/roles', RoleRoute);
router.use('/events', EventRoute);
router.use('/bills', BillRoute);
router.use('/classes', ClassRoute);

export default router;
