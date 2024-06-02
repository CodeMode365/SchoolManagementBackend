import { AttendanceController } from '@/controller';
import { Router } from 'express';

const router = Router();

// Basic CRUD operations
router.get('/all', AttendanceController.getAll);
router.get('/by-org/:orgId', AttendanceController.getByOrg);
router.get('/by-user/:userId', AttendanceController.getByUser);
router.post('/add', AttendanceController.add);
// router.patch('/update/:attendanceId', AttendanceController.update);
router.delete('/remove/:attendanceId', AttendanceController.remove);

// Bulk operations
// router.post('/bulk-add', AttendanceController.bulkAdd);
// router.delete('/bulk-remove', AttendanceController.bulkRemove);

// Class-based attendance
// router.post('/add-bulk-class', AttendanceController.addBulkForClass);

export default router;
