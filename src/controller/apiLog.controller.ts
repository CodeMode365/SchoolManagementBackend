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

export default { getAll };
