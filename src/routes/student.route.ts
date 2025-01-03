import { AccountType } from '@/config/enums.config';
import { StudentController } from '@/controller';
import { can } from '@/middleware';
import { Router } from 'express';

const router = Router();

router.get(
  '/all/:orgId',
  can([AccountType.ADMIN, AccountType.SUPER_ADMIN]),
  StudentController.getAll
);
router.get('/:studentId', StudentController.getStudent);
router.post('/add', StudentController.addStudent);
router.patch('/update/:studentId', StudentController.update);
router.delete('/remove/:studentId', StudentController.remove);

/*
//attendance
router.get('/:studentId/attendance', StudentController.getAttendance);
router.post('/:studentId/attendance', StudentController.markAttendance);
router.patch(
  '/:studentId/attendance/:attendanceId',
  StudentController.updateAttendance
);
router.delete(
  '/:studentId/attendance/:attendanceId',
  StudentController.removeAttendance
);
*/

//parent management
router.get('/get-parents/:studentId', StudentController.getParents);
router.patch('/add-parent/:studentId', StudentController.addParent);

//grouped
router.get('/by-org/:organizationId', StudentController.getByOrg);
router.get('/by-class/:classId', StudentController.getByClass);

//Bulk management
router.post('/bulk-add', StudentController.bulkAdd);
router.delete('/bulk-delete', StudentController.bulkDelete);

export default router;
