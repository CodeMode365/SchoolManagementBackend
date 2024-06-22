import { ValChecker } from '@/helpers';
import { Result } from '@/models';
import { CrudService } from '@/services';
import type { ResultSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const CrudSrv = new CrudService<ResultSchemaType>(Result);

export const getAll = async (req: Request, res: Response) => {
  const { orgId } = req.query;
  if (!orgId) {
    return res.status(400).json({ message: 'orgId is required' });
  }
  return CrudSrv.getAll({}, { page: 1, limit: 10 });
};

export const getById = async (req: Request, res: Response) => {
  const { resultId } = req.params;
  return CrudSrv.getOne(resultId);
};

export const create = async (req: Request, res: Response) => {
  const { studentId, ...rest } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: 'studentId is required' });
  }
  return CrudSrv.create({ studentId, ...rest });
};

export const update = async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const { studentId, ...rest } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: 'studentId is required' });
  }
  return CrudSrv.update(resultId, { studentId, ...rest });
};

export const remove = async (req: Request, res: Response) => {
  const { resultId } = req.params;
  return CrudSrv.remove(resultId);
};
