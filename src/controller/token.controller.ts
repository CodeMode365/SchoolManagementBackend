import { Token } from '@/models';
import { CrudService } from '@/services';
import type { TokenSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';

const CrudSrv = new CrudService<TokenSchemaType>(Token);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const { startDate, endDate, page, limit } = JSON.parse(filter as string);
  const filters: FilterQuery<TokenSchemaType> = [
    {
      $and: [
        startDate && { createdAt: { $gte: startDate } },
        endDate && { createdAt: { $lte: endDate } },
      ].filter(Boolean),
    },
  ];
  const tokens = await CrudSrv.getAll(filters, { page, limit });
  return res.json(tokens);
};

const getById = async (req: Request, res: Response) => {
  const { tokenId } = req.params;
  const token = await CrudSrv.getOne(tokenId);
  return res.json(token);
};

const getByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { filter } = req.query;
  const { startDate, endDate, page, limit } = JSON.parse(filter as string);
  const filters: FilterQuery<TokenSchemaType> = [
    {
      $and: [
        { user: new mongoose.Types.ObjectId(userId) },
        startDate && { createdAt: { $gte: startDate } },
        endDate && { createdAt: { $lte: endDate } },
      ].filter(Boolean),
    },
  ];
  const tokens = await CrudSrv.getAll(filters, { page, limit });
  return res.json(tokens);
};

const remove = async (req: Request, res: Response) => {
  const { tokenId } = req.params;
  const token = await CrudSrv.remove(tokenId);
  return res.json(token);
};

export default {
  getAll,
  getById,
  getByUser,
  remove,
};
