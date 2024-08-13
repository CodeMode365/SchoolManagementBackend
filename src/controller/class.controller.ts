import { ValChecker } from '@/helpers';
import { Class } from '@/models';
import { CrudService } from '@/services';
import type { ClassSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<ClassSchemaType>(Class);

const create = async (req: Request, res: Response) => {
  const payload = ValChecker.checkMissingFields(['className'], req.body);
  const classData = await CrudSrv.create({
    ...payload,
    organization: req.orgId,
  });
  return res.json(classData);
};

const remove = async (req: Request, res: Response) => {
  const { classId } = ValChecker.checkMissingFields(['classId'], req.params);
  await CrudSrv.remove(classId);
  return res.json({ message: 'Class deleted!' });
};

const update = async (req: Request, res: Response) => {
  const { classId } = ValChecker.checkMissingFields(['classId'], req.params);
  const payload = ValChecker.checkMissingFields(['className'], req.body);
  const classData = await CrudSrv.update(classId, {
    ...payload,
  });
  return res.json(classData);
};

const getAll = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  const { filter } = req.query;
  const { search, limit = 20, page = 1 } = JSON.parse(filter as string);
  const filters: FilterQuery<ClassSchemaType> = {
    $and: [
      { organization: orgId },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };

  const classes = await CrudSrv.getAll(filters, { page, limit });
  return res.json(classes);
};

const getById = async (req: Request, res: Response) => {
  const classData = await CrudSrv.getOne(req.params.classId);
  return res.json(classData);
};

export default { create, remove, update, getAll, getById };
