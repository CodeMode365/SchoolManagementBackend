import { ValChecker } from '@/helpers';
import { Exam } from '@/models';
import { CrudService } from '@/services';
import type { ExamSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<ExamSchemaType>(Exam);

export const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const { startDate, endDate, page, limit } = JSON.parse(filter as string);
  const filters: FilterQuery<ExamSchemaType> = {
    $and: [
      startDate && { startDate: { $gte: startDate } },
      endDate && { endDate: { $lte: endDate } },
    ].filter(Boolean),
  };
  const complaints = await CrudSrv.getAll(filters, { page, limit });
  return res.json(complaints);
};

export const create = async (req: Request, res: Response) => {
  const payload = ValChecker.checkMissingFields(
    ['title', 'description', 'startDate', 'endDate', 'organization'],
    req.body
  );
  const createdBy: any = req.userId;
  const exam = await CrudSrv.create({ ...payload, createdBy });
  return res.json(exam);
};

export const update = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const payload = ValChecker.checkMissingFields(
    ['title', 'description', 'startDate', 'endDate'],
    req.body
  );
  const exam = await CrudSrv.update(examId, payload);
  return res.json(exam);
};

export const remove = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const exam = await CrudSrv.remove(examId);
  return res.json(exam);
};

export const getById = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const exam = await CrudSrv.getOne(examId);
  return res.json(exam);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
