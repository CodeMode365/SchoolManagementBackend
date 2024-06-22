import { Handler, Helper, ValChecker } from '@/helpers';
import { Complaint } from '@/models';
import { CrudService } from '@/services';
import type { ComplaintSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import { Types } from 'mongoose';

const CrudSrv = new CrudService<ComplaintSchemaType>(Complaint);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const {
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = JSON.parse(filter as string);
  const filters: FilterQuery<ComplaintSchemaType> = {
    $and: [
      startDate && { createdAt: { $gte: startDate } },
      endDate && { createdAt: { $lte: endDate } },
    ].filter(Boolean),
  };
  const complaints = await CrudSrv.getAll(filters, { page, limit });
  return res.json(complaints);
};

const getByOrg = async (req: Request, res: Response) => {
  const { orgId } = req.query;
  const { filter } = req.query;
  const {
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = JSON.parse(filter as string);
  const filters: FilterQuery<ComplaintSchemaType> = {
    $and: [
      startDate && { createdAt: { $gte: startDate } },
      endDate && { createdAt: { $lte: endDate } },
    ].filter(Boolean),
  };
  const complaints = await CrudSrv.getByOrg(orgId as string, filters, {
    page,
    limit,
  });
  return res.json(complaints);
};

const remove = async (req: Request, res: Response) => {
  const { complaintId } = req.query;
  await CrudSrv.remove(complaintId as string);
  return res.json({ message: 'Complaint removed successfully!' });
};
const create = async (req: Request, res: Response) => {
  const { orgId, title, description } = ValChecker.checkMissingFields(
    ['orgId', 'title', 'description'],
    req.body
  );
  const userId = req.userId;
  const complaint = await CrudSrv.create({
    organization: orgId,
    user: userId as any,
    title,
    description,
  });
  return res.json(complaint);
};

const update = async (req: Request, res: Response) => {
  const { complaintId } = req.params;
  const payload = ValChecker.checkMissingFields(
    ['title', 'description'],
    req.body
  );
  const complaint = await CrudSrv.update(complaintId, payload);
  return res.json(complaint);
};

export default { getAll, getByOrg, remove, update, create };
