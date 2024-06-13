import { ValChecker } from '@/helpers';
import { Class } from '@/models';
import { CrudService } from '@/services';
import type { ClassSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const CrudSrv = new CrudService<ClassSchemaType>(Class);

const create = async (req: Request, res: Response) => {
  const payload = ValChecker.checkMissingFields(
    ['className', 'section', 'monitor'],
    req.body
  );
  const { monitor, classTeacher } = req.body;
  const classData = await CrudSrv.create({ ...payload, monitor, classTeacher });
  return res.json(classData);
};

const remove = async (req: Request, res: Response) => {
  const { classId } = ValChecker.checkMissingFields(['classId'], req.params);
  await CrudSrv.remove(classId);
  return res.json({ message: 'Class deleted!' });
};

const update = async (req: Request, res: Response) => {
  const { classId } = ValChecker.checkMissingFields(['classId'], req.params);
  const payload = ValChecker.checkMissingFields(
    ['className', 'section', 'monitor'],
    req.body
  );
  const { monitor, classTeacher } = req.body;
  const classData = await CrudSrv.update(classId, {
    ...payload,
    monitor,
    classTeacher,
  });
  return res.json(classData);
};

const getAll = async (req: Request, res: Response) => {
  const classes = await CrudSrv.getAll({}, { page: 1, limit: 10 });
  return res.json(classes);
};

const getById = async (req: Request, res: Response) => {
  const classData = await CrudSrv.getOne(req.params.classId);
  return res.json(classData);
};

export default { create, remove, update, getAll, getById };
