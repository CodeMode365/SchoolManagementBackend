import { Student } from '@/models';
import type { StudentSchemaType } from '@/types/model';
import { ApiError } from '@/utils';
import { pick } from 'lodash';
import { Types } from 'mongoose';

const getStudent = async (stdId: string) => {
  const student = await Student.findById(stdId);
  if (!student) throw ApiError.notFound('Student not found');
  return student;
};

const addNewStudent = async (payload: StudentSchemaType) => {
  const newStudent = new Student({ ...payload });
  await newStudent.save();
  return newStudent;
};

const updateStudent = async (
  stdId: string,
  payload: Partial<StudentSchemaType>
) => {
  const student = await Student.findByIdAndUpdate(stdId, payload, {
    new: true,
  });
  if (!student) throw ApiError.notFound('Student not found');
  return student;
};

const removeStudent = async (stdId: string) => {
  await Student.findByIdAndDelete(stdId).then((msg) => {
    if (msg === null) throw ApiError.notFound('Student not found');
  });
};

//grouped student
const getByOrg = async (orgId: string) => {
  const students = await Student.find().where({ organization: orgId });
  if (!students) throw ApiError.notFound('Students not found');
  return students;
};

const getByClass = async (classId: string) => {
  const student = await Student.find().where({
    $elemMatch: { class: classId },
  });
  if (!student) throw ApiError.notFound('Student not found');
  return student;
};

//parents management
const getParents = async (stdId: string) => {
  const parents = await Student.findById(stdId).populate('parents');
  return pick(parents, ['parents']);
};

const addParent = async (stdId: string, parentId: string) => {
  const parent = await Student.findOneAndUpdate(
    { _id: stdId, parents: { $nin: [parentId] } },
    { $push: { parents: parentId } },
    { new: true }
  );
  if (!parent) throw ApiError.badRequest('Method not allowed!');
  return parent;
};

const bulkAdd = async (payload: StudentSchemaType[]) => {
  const students = await Student.insertMany(payload);
  return students;
};

const bulkDelete = async (stdIds: string[]) => {
  await Student.deleteMany(stdIds);
};

//attendence
// const getAttendance = async (stdId: string) => {
//   const student = await Student.findById(stdId);
//   if (!student) throw ApiError.notFound('Student not found');
//   return student;
// };

export default {
  getStudent,
  addNewStudent,
  updateStudent,
  getByClass,
  getByOrg,
  removeStudent,
  getParents,
  addParent,
  bulkAdd,
  bulkDelete,
};
