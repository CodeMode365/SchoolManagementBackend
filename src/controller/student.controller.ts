import { ValChecker } from '@/helpers';
import { Student } from '@/models';
import { CrudService, StudentService } from '@/services';
import type { StudentSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<StudentSchemaType>(Student);

const getAll = async (req: Request, res: Response) => {
  const { orgId } = req;
  const { filter } = req.query;
  const {
    page = 1,
    limit = 20,
    search,
    classId,
    sectionId,
  } = JSON.parse(filter as string);
  const filters: FilterQuery<StudentSchemaType> = {
    $and: [
      { organization: { $eq: orgId } },
      search && { $text: { $search: search } },
      classId && { class: { $eq: classId } },
      sectionId && { section: { $eq: sectionId } },
    ].filter(Boolean),
  };
  const users = await CrudSrv.getAll(filters, { page, limit });
  return res.json(users);
};

const getStudent = async (req: Request, res: Response) => {
  const { studentId } = ValChecker.checkMissingFields(
    ['studentId'],
    req.params
  );
  const user = await StudentService.getStudent(studentId);
  return res.json(user);
};

const getByClass = async (req: Request, res: Response) => {
  const { classId } = ValChecker.checkMissingFields(['classId'], req.params);
  const user = await StudentService.getByClass(classId);
  return res.json(user);
};

const getByOrg = async (req: Request, res: Response) => {
  const { orgId } = ValChecker.checkMissingFields(['orgId'], req.params);
  const user = await StudentService.getByOrg(orgId);
  return res.json(user);
};

const getParents = async (req: Request, res: Response) => {
  const { studentId } = ValChecker.checkMissingFields(
    ['studentId'],
    req.params
  );
  const user = await StudentService.getParents(studentId);
  return res.json(user);
};

const addParent = async (req: Request, res: Response) => {
  const { studentId } = ValChecker.checkMissingFields(
    ['studentId'],
    req.params
  );
  const { parentId } = ValChecker.checkMissingFields(['parentId'], req.body);
  const user = await StudentService.addParent(studentId, parentId);
  return res.json(user);
};

const addStudent = async (req: Request, res: Response) => {
  const values = ValChecker.checkMissingFields(
    [
      'firstName',
      'lastName',
      'middleName',
      'dateOfBirth',
      'gender',
      'address',
      'phone',
      'organization',
    ],
    req.body
  );
  const { parents = [], user = null, class: studentClass } = req.body;
  const newUser = await StudentService.addNewStudent({
    ...values,
    parents,
    user,
    class: studentClass,
  } as StudentSchemaType);
  return res.json(newUser);
};

const update = async (req: Request, res: Response) => {
  const { studentId } = ValChecker.checkMissingFields(
    ['studentId'],
    req.params
  );
  const studentDetails = (({
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    address,
    phone,
    organization,
  }) => ({
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    address,
    phone,
    organization,
  }))(req.body);

  const user = await StudentService.updateStudent(studentId, studentDetails);
  return res.json(user);
};

const remove = async (req: Request, res: Response) => {
  ValChecker.checkMissingFields(['studentId'], req.params);
  const { studentId } = req.params;
  await StudentService.removeStudent(studentId);
  return res.json({ message: 'Student removed successfully' });
};

const bulkAdd = async (req: Request, res: Response) => {
  ValChecker.checkMissingFields(['students'], req.body);
  const { students } = req.body;
  const user = await StudentService.bulkAdd(students);
  return res.json(user);
};
const bulkDelete = async (req: Request, res: Response) => {
  ValChecker.checkMissingFields(['stdIds'], req.body);
  const { stdIds } = req.body;
  const user = await StudentService.bulkDelete(stdIds);
  return res.json(user);
};

//attendence management
/*
const getAttendance = (req: Request, res: Response) => {};
const updateAttendance = (req: Request, res: Response) => {};
const removeAttendance = (req: Request, res: Response) => {};
const markAttendance = (req: Request, res: Response) => {};
*/
export default {
  getStudent,
  getByClass,
  getByOrg,
  getParents,
  addStudent,
  update,
  remove,
  bulkAdd,
  bulkDelete,
  addParent,
  getAll,
  // getAttendance,
  // removeAttendance,
  // updateAttendance,
  // markAttendance,
};
