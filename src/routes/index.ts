import { default as AuthRoute } from './auth.route';
import { default as StudentRoute } from './student.route';
import { default as ParentRoute } from './parent.route';
import { default as AttendanceRoute } from './attendance.route';
import { default as ApiLogRoute } from './apiLog.route';
import { default as RoleRoute } from './role.route';
import { default as EventRoute } from './event.route';
import { default as BillRoute } from './bill.route';
import { default as ClassRoute } from './class.route';
import { default as OrganizationRoute } from './organization.route';
// import { default as SessionRoute } from './session.route';
import { default as TokenRoute } from './token.route';
import { default as TransactionRoute } from './transaction.route';
import { default as TeacherRoute } from './teacher.route';
import { default as StaffRoute } from './staff.route';
import { Router } from 'express';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/users/students', StudentRoute);
router.use('/users/parents', ParentRoute);
router.use('/users/teachers', TeacherRoute);
router.use('/users/staffs', StaffRoute);
router.use('/attendances', AttendanceRoute);
router.use('/apiLogs', ApiLogRoute);
router.use('/roles', RoleRoute);
router.use('/events', EventRoute);
router.use('/bills', BillRoute);
router.use('/classes', ClassRoute);
// router.use('/sessions', SessionRoute);
router.use('/tokens', TokenRoute);
router.use('/organizations', OrganizationRoute);
router.use('/transactions', TransactionRoute);

export default router;
