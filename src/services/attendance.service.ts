import { Attendance, Student } from '@/models';
import type { AttendanceSchemaType } from '@/types/model';

const getAll = async () => {
  return Attendance.find();
};

const getByUser = async (userId: string) => {
  return Attendance.find({ user: userId });
};

const getByOrg = async (orgId: string) => {
  return Attendance.find({ user: { org: orgId } });
};

const add = async (payload: AttendanceSchemaType) => {
  const attendance = new Attendance(payload);
  await attendance.save();
  return attendance;
};

const update = async (
  attendanceId: string,
  payload: Partial<AttendanceSchemaType>
) => {
  const updatedAttendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    payload,
    { new: true }
  );
  return updatedAttendance;
};

const remove = async (attendanceId: string) => {
  await Attendance.findByIdAndDelete(attendanceId);
};

const bulkAdd = async (payload: AttendanceSchemaType[]) => {
  return Attendance.insertMany(payload);
};

const bulkRemove = async (attendanceIds: string[]) => {
  return Attendance.deleteMany({ _id: { $in: attendanceIds } });
};

const addBulkForClass = async (status: string, classId: string) => {
  const students = await Student.find({ class: classId });
  const attendances = students.map((student) => ({
    status,
    user: student._id,
  }));
  return Attendance.insertMany(attendances);
};

export default {
  getAll,
  getByUser,
  getByOrg,
  add,
  update,
  remove,
  bulkAdd,
  bulkRemove,
  addBulkForClass,
};
