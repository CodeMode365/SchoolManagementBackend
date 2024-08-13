import { ValChecker } from '@/helpers';
import { Teacher } from '@/models';
import { CrudService } from '@/services';
import type { TeacherSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<TeacherSchemaType>(Teacher);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const org = req.orgId;
  const { page, limit, endDate, startDate, search } = JSON.parse(
    filter as string
  );
  const filters: FilterQuery<TeacherSchemaType> = {
    $and: [
      { organization: org },
      startDate && { createdAt: { $gte: new Date(startDate) } },
      endDate && { createdAt: { $lte: new Date(endDate) } },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };
  const teachers = await CrudSrv.getAll(filters, { page, limit });
  return res.json(teachers);
};

const getById = async (req: Request, res: Response) => {
  const { teacherId } = ValChecker.checkMissingFields(
    ['teacherId'],
    req.params
  );
  const teacher = await CrudSrv.getOne(teacherId);
  return res.json(teacher);
};

const update = async (req: Request, res: Response) => {
  const { teacherId } = ValChecker.checkMissingFields(
    ['teacherId'],
    req.params
  );
  const teacherDetails = req.body;
  const teacher = await CrudSrv.update(teacherId, teacherDetails);
  return res.json(teacher);
};

const create = async (req: Request, res: Response) => {
  const teacherDetails = req.body;
  const teacher = await CrudSrv.create(teacherDetails);
  return res.json(teacher);
};

const remove = async (req: Request, res: Response) => {
  const { teacherId } = ValChecker.checkMissingFields(
    ['teacherId'],
    req.params
  );
  const teacher = await CrudSrv.remove(teacherId);
  return res.json(teacher);
};

export default {
  getAll,
  getById,
  update,
  create,
  remove,
};
