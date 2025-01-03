import { ValChecker } from '@/helpers';
import { Organization } from '@/models';
import { CrudService } from '@/services';
import type { OrganizationSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<OrganizationSchemaType>(Organization);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const { page = 1, limit = 20 } = filter ? JSON.parse(filter as string) : {};
  const filters: FilterQuery<OrganizationSchemaType> = {};
  const orgs = await CrudSrv.getAll(filters, { page, limit });
  return res.json(orgs);
};

const getById = async (req: Request, res: Response) => {
  const { orgId } = req.params;
  const org = await CrudSrv.getOne(orgId);
  return res.json(org);
};

const remove = async (req: Request, res: Response) => {
  const { orgId } = req.params;
  await CrudSrv.remove(orgId);
  return res.json({ message: 'Organization removed!' });
};

const create = async (req: Request, res: Response) => {
  const payload = ValChecker.checkMissingFields(
    ['name', 'address', 'phone', 'email', 'urls'],
    req.body
  );
  const org = await CrudSrv.create({ ...payload, status: 'inactive' });
  return res.json(org);
};

export default {
  getAll,
  getById,
  remove,
  create,
};
