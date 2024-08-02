import { ValChecker } from '@/helpers';
import { Session } from '@/models';
import { CrudService } from '@/services';
import type { UserSessionSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';

const CrudSrv = new CrudService<UserSessionSchemaType>(Session);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const userId = req.userId
  const { startDate, endDate, page, limit } = JSON.parse(filter as string);
  const filters: FilterQuery<UserSessionSchemaType> = {
    $and: [
      { user: new mongoose.Types.ObjectId(userId) as any },
      startDate && { createdAt: { $gte: new Date(startDate) } },
      endDate && { createdAt: { $lte: new Date(endDate) } },
    ].filter(Boolean),
  };
  const sessions = await CrudSrv.getAll(filters, { page, limit });
  return res.json(sessions);
};

const remove = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  await CrudSrv.remove(sessionId);
  return res.json({ message: 'Session deleted!' });
};

const create = async (req: Request, res: Response) => {
  const userId = req.userId;
  const payload = ValChecker.checkMissingFields(
    ['agent', 'browser', 'ip', 'device'],
    req.body
  );
  const session = await CrudSrv.create({
    user: new mongoose.Types.ObjectId(userId) as any,
    ...payload,
  });
  return res.json(session);
};

const update = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const payload = ValChecker.checkMissingFields(
    ['agent', 'browser', 'ip', 'device'],
    req.body
  );
  const session = await CrudSrv.update(sessionId, payload);
  return res.json(session);
};

const getById = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const session = await CrudSrv.getOne(sessionId);
  return res.json(session);
};

export default { getAll, remove, create, update, getById };
