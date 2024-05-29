import mongoose from 'mongoose';
// const { PERMISSIONS } = require('../../constants/index');
// const { ROLE, PERMISSION } = PERMISSIONS;
import { PERMISSIONS, ROLES } from '@/config/constants.config';

export default [
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f04'),
    name: 'STUDENT_READ',
    description: 'read a student',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f05'),
    name: 'STUDENT_WRITE',
    description: 'write a student',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f06'),
    name: 'STUDENT_UPDATE',
    description: 'update a student',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f07'),
    name: 'STUDENT_DELETE',
    description: 'delete a student',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f08'),
    name: 'TEACHER_READ',
    description: 'read a teacher',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f09'),
    name: 'TEACHER_WRITE',
    description: 'write a teacher',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f0a'),
    name: 'TEACHER_UPDATE',
    description: 'update a teacher',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f0b'),
    name: 'TEACHER_DELETE',
    description: 'delete a teacher',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f0c'),
    name: 'PARENT_READ',
    description: 'read a parent',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f0d'),
    name: 'PARENT_WRITE',
    description: 'write a parent',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f0e'),
    name: 'PARENT_UPDATE',
    description: 'update a parent',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f0f'),
    name: 'PARENT_DELETE',
    description: 'delete a parent',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f10'),
    name: 'COURSE_READ',
    description: 'read a course',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f11'),
    name: 'COURSE_WRITE',
    description: 'write a course',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f12'),
    name: 'COURSE_UPDATE',
    description: 'update a course',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f13'),
    name: 'COURSE_DELETE',
    description: 'delete a course',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f14'),
    name: 'CLASS_READ',
    description: 'read a class',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f15'),
    name: 'CLASS_WRITE',
    description: 'write a class',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f16'),
    name: 'CLASS_UPDATE',
    description: 'update a class',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f17'),
    name: 'CLASS_DELETE',
    description: 'delete a class',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f18'),
    name: 'ATTENDANCE_READ',
    description: 'read a attendance',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f19'),
    name: 'ATTENDANCE_WRITE',
    description: 'write a attendance',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f1a'),
    name: 'ATTENDANCE_UPDATE',
    description: 'update a attendance',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f1b'),
    name: 'ATTENDANCE_DELETE',
    description: 'delete a attendance',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f1c'),
    name: 'GRADE_READ',
    description: 'read a grade',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f1d'),
    name: 'GRADE_WRITE',
    description: 'write a grade',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f1e'),
    name: 'GRADE_UPDATE',
    description: 'update a grade',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f1f'),
    name: 'GRADE_DELETE',
    description: 'delete a grade',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f20'),
    name: 'EXAM_READ',
    description: 'read a exam',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f21'),
    name: 'EXAM_WRITE',
    description: 'write a exam',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f22'),
    name: 'EXAM_UPDATE',
    description: 'update a exam',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f23'),
    name: 'EXAM_DELETE',
    description: 'delete a exam',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f24'),
    name: 'LOGS_READ',
    description: 'read a logs',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f25'),
    name: 'LOGS_WRITE',
    description: 'write a logs',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f26'),
    name: 'LOGS_UPDATE',
    description: 'update a logs',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f27'),
    name: 'LOGS_DELETE',
    description: 'delete a logs',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f28'),
    name: 'BILL_READ',
    description: 'read a bill',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f29'),
    name: 'BILL_WRITE',
    description: 'write a bill',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f2a'),
    name: 'BILL_UPDATE',
    description: 'update a bill',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f2b'),
    name: 'BILL_DELETE',
    description: 'delete a bill',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f2c'),
    name: 'EVENT_READ',
    description: 'read a event',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f2d'),
    name: 'EVENT_WRITE',
    description: 'write a event',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f2e'),
    name: 'EVENT_UPDATE',
    description: 'update a event',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f2f'),
    name: 'EVENT_DELETE',
    description: 'delete a event',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f30'),
    name: 'GROUP_READ',
    description: 'read a group',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f31'),
    name: 'GROUP_WRITE',
    description: 'write a group',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f32'),
    name: 'GROUP_UPDATE',
    description: 'update a group',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f33'),
    name: 'GROUP_DELETE',
    description: 'delete a group',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f34'),
    name: 'ORGANIZATION_READ',
    description: 'read a organization',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f35'),
    name: 'ORGANIZATION_WRITE',
    description: 'write a organization',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f36'),
    name: 'ORGANIZATION_UPDATE',
    description: 'update a organization',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f37'),
    name: 'ORGANIZATION_DELETE',
    description: 'delete a organization',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f38'),
    name: 'USER_READ',
    description: 'read a user',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f39'),
    name: 'USER_WRITE',
    description: 'write a user',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f3a'),
    name: 'USER_UPDATE',
    description: 'update a user',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f3b'),
    name: 'USER_DELETE',
    description: 'delete a user',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f3c'),
    name: 'STAFF_READ',
    description: 'read a staff',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f3d'),
    name: 'STAFF_WRITE',
    description: 'write a staff',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f3e'),
    name: 'STAFF_UPDATE',
    description: 'update a staff',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f3f'),
    name: 'STAFF_DELETE',
    description: 'delete a staff',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f40'),
    name: 'ADMIN_READ',
    description: 'read a admin',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f41'),
    name: 'ADMIN_WRITE',
    description: 'write a admin',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f42'),
    name: 'ADMIN_UPDATE',
    description: 'update a admin',
  },
  {
    _id: new mongoose.Types.ObjectId('6656c700233e2d845c8a0f43'),
    name: 'ADMIN_DELETE',
    description: 'delete a admin',
  },
];
