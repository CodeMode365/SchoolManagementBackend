import { Transaction } from '@/models';
import { CrudService } from '@/services';
import type { TransactionSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<TransactionSchemaType>(Transaction);

const getAll = async (req: Request, res: Response) => {
  const { orgId } = req;
  const { filter } = req.query;
  const { startDate, endDate, page, limit, status } = JSON.parse(
    filter as string
  );
  const filters: FilterQuery<TransactionSchemaType> = {
    $and: [
      { organization: { $eq: orgId } },
      status && { status },
      startDate && { createdAt: { $gte: new Date(startDate) } },
      endDate && { createdAt: { $lte: new Date(endDate) } },
    ].filter(Boolean),
  };
  const transactions = await CrudSrv.getAll(filters, { page, limit });
  return res.json(transactions);
};

const getById = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const transaction = await CrudSrv.getOne(transactionId);
  if (!transaction) {
    return res.status(404).json({
      status: 'fail',
      message: 'No transaction found',
    });
  }
  return res.json(transaction);
};

const create = async (req: Request, res: Response) => {
  const data = req.body;
  const trans = await CrudSrv.create(data);
  return res.json(trans);
};

const update = async (req: Request, res: Response) => {
  const data = req.body;
  const { transactionId } = req.params;
  const transaction = await CrudSrv.getOne(transactionId);
  if (!transaction) {
    return res.status(404).json({
      status: 'fail',
      message: 'No transaction found',
    });
  }
  const updatedTransaction = await CrudSrv.update(
    req.params.transactionId,
    data
  );
  return res.json(updatedTransaction);
};

const remove = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const transaction = await CrudSrv.getOne(transactionId);
  if (!transaction) {
    return res.status(404).json({
      status: 'fail',
      message: 'No transaction found',
    });
  }
  await CrudSrv.remove(req.params.transactionId);
  return res.json({
    status: 'success',
    message: 'Transaction deleted successfully',
  });
};

export default {
  remove,
  create,
  getAll,
  getById,
  update,
};
