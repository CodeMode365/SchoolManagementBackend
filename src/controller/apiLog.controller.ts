import { ValChecker } from '@/helpers';
import { ApiLog } from '@/models';
import { CrudService } from '@/services';
import type { ApiLogSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import moment from 'moment';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<ApiLogSchemaType>(ApiLog);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const { startDate, endDate, page, limit, method, search } = JSON.parse(
    filter as string
  );
  const filters: FilterQuery<ApiLogSchemaType> = {
    $and: [
      startDate && { createdAt: { $gte: new Date(startDate) } },
      endDate && { createdAt: { $lte: new Date(endDate) } },
      method && { method },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };

  const apiLogs = await CrudSrv.getAll(filters, { page, limit });
  return res.json(apiLogs);
};

const getById = async (req: Request, res: Response) => {
  const apiLog = await CrudSrv.getOne(req.params.apiLogId);
  return res.json(apiLog);
};

const remove = async (req: Request, res: Response) => {
  await CrudSrv.remove(req.params.apiLogId);
  return res.json({ message: 'ApiLog deleted!' });
};

const update = async (req: Request, res: Response) => {
  const { apiLogId } = req.params;
  const payload = ValChecker.checkMissingFields(
    ['url', 'method', 'status', 'responseTime', 'ip', 'userAgent'],
    req.params
  );
  const apiLog = await CrudSrv.update(apiLogId, payload);
  return res.json(apiLog);
};

export default { getAll, getById, update, remove };
