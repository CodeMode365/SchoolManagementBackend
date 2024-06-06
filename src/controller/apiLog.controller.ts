import { ValChecker } from '@/helpers';
import { ApiLog } from '@/models';
import { CrudService } from '@/services';
import type { ApiLogSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const CrudSrv = new CrudService<ApiLogSchemaType>(ApiLog);

const getAll = async (req: Request, res: Response) => {
  const filters = req.query.filters
    ? JSON.parse(req.query.filters as string)
    : {};
  const apiLogs = await CrudSrv.getAll(filters, { page: 1, limit: 10 });
  return res.json(apiLogs);
};

const getById = async (req: Request, res: Response) => {
  const apiLog = await CrudSrv.getOne(req.params.apiLogId);
  return res.json(apiLog);
};

const create = async (req: Request, res: Response) => {
  const apiLog = await CrudSrv.create(req.body);
  return res.json(apiLog);
};

const remove = async (req: Request, res: Response) => {
  await CrudSrv.remove(req.params.apiLogId);
  return res.json({ message: 'ApiLog deleted!' });
};

const update = async (req: Request, res: Response) => {
  const { apiLogId } = req.params;
  const { url, method, status, responseTime, ip, userAgent } =
    ValChecker.checkMissingFields(
      ['url', 'method', 'status', 'responseTime', 'ip', 'userAgent'],
      req.params
    );
  const apiLog = await CrudSrv.update(apiLogId, {
    url,
    method,
    status,
    responseTime,
    ip,
    userAgent,
  });
  return res.json(apiLog);
};

export default { getAll, getById, update, remove, create };
