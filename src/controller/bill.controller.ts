import { ValChecker } from '@/helpers';
import { Bill } from '@/models';
import { CrudService } from '@/services';
import type { BillSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const CrudSrv = new CrudService<BillSchemaType>(Bill);

const getAll = async (req: Request, res: Response) => {
  const bills = await CrudSrv.getAll({}, { page: 1, limit: 10 });
  return res.json(bills);
};

const create = async (req: Request, res: Response) => {
  const payload = ValChecker.checkMissingFields(
    ['name', 'description', 'amount'],
    req.body
  );
  const bill = await CrudSrv.create(payload);
  return res.json(bill);
};

const update = async (req: Request, res: Response) => {
  const { billId } = ValChecker.checkMissingFields(['billId'], req.params);
  const payload = ValChecker.checkMissingFields(
    ['name', 'description', 'amount'],
    req.body
  );
  const bill = await CrudSrv.update(billId, payload);
  return res.json(bill);
};

const remove = async (req: Request, res: Response) => {
  const { billId } = ValChecker.checkMissingFields(['billId'], req.params);
  await CrudSrv.remove(billId);
  return res.json({ message: 'Parent deleted!' });
};

export default { create, update, remove, getAll };
