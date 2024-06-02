import { AttendanceService } from '@/services';
import { ValChecker } from '@/helpers';
import type { Request, Response } from 'express';
import type { AttendanceSchemaType } from '@/types/model';

const getAll = async (req: Request, res: Response) => {
  const attendances = await AttendanceService.getAll();
  return res.json(attendances);
};

const getByUser = async (req: Request, res: Response) => {
  const { userId } = ValChecker.checkMissingFields(['userId'], req.params);
  const attendances = await AttendanceService.getByUser(userId);
  return res.json(attendances);
};

const getByOrg = async (req: Request, res: Response) => {
  const { orgId } = ValChecker.checkMissingFields(['orgId'], req.params);
  const attendances = await AttendanceService.getByOrg(orgId);
  return res.json(attendances);
};

const add = async (req: Request, res: Response) => {
  const { status, userId } = ValChecker.checkMissingFields(
    ['status', 'userId'],
    req.body
  );
  const newAttendance = await AttendanceService.add({
    status,
    user: userId,
  } as AttendanceSchemaType);
  return res.json(newAttendance);
};

/*
const update = async (req: Request, res: Response) => {
  const { attendanceId, status } = ValChecker.checkMissingFields(
    ['attendanceId'],
    req.body
  );
  const updatedAttendance = await AttendanceService.update(
    attendanceId,
    req.body
  );
  return res.json(updatedAttendance);
};
*/

const remove = async (req: Request, res: Response) => {
  const { attendanceId } = ValChecker.checkMissingFields(
    ['attendanceId'],
    req.params
  );
  await AttendanceService.remove(attendanceId);
  return res.json({ message: 'Attendance record deleted!' });
};

const bulkAdd = async (req: Request, res: Response) => {
  const newAttendances = await AttendanceService.bulkAdd(req.body);
  return res.json(newAttendances);
};

const bulkRemove = async (req: Request, res: Response) => {
  await AttendanceService.bulkRemove(req.body.attendanceIds);
  return res.json({ message: 'Attendance records deleted!' });
};

const addBulkForClass = async (req: Request, res: Response) => {
  const { status, classId } = ValChecker.checkMissingFields(
    ['status', 'classId'],
    req.body
  );
  const newAttendances = await AttendanceService.addBulkForClass(
    status,
    classId
  );
  return res.json(newAttendances);
};

export default {
  getAll,
  getByUser,
  getByOrg,
  add,
  // update,
  remove,
  bulkAdd,
  bulkRemove,
  addBulkForClass,
};
