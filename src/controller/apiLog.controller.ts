import { ValChecker } from '@/helpers';
import { ApiLog, User } from '@/models';
import { CrudService } from '@/services';
import type { ApiLogSchemaType } from '@/types/model';
import type { constants } from 'crypto';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<ApiLogSchemaType>(ApiLog);

axios.get('URL/products?limit=2&page=2', {
  headers: {
    Authorization: 'token',
    query: {
      limit: 10,
      page: 1,
    },
  },
});

const { limit = 100, page = 1 } = req.query;

Products.find({ userId, search })
  .skip((page - 1) * limit);
  .limit(limit)

  const totalData = Products.find({ userId, search }).count()
  if (error) {
    return res.status(500).send({ message: "Error occurred while fetching data" });
  }

  const paginationData = {
    total: totalData,
    lastPage: Math.ceil(totalData / limit),
    currentPage: page,
    limit,
    nextPage: page < Math.ceil(totalData / limit) ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };

return res.json({data, paginationData})


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
