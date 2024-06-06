import { ValChecker } from '@/helpers';
import { Role } from '@/models';
import { CrudService } from '@/services';
import type { RoleSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const CrudSrv = new CrudService<RoleSchemaType>(Role);

const getAll = async (req: Request, res: Response) => {
  const roles = await CrudSrv.getAll({}, { page: 1, limit: 10 });
  return res.json(roles);
};

const update = async (req: Request, res: Response) => {
  const { roleId } = ValChecker.checkMissingFields(['roleId'], req.params);
  const {
    name,
    permissions = [],
    description = '',
  } = ValChecker.checkMissingFields(
    ['name', 'permissions', 'description'],
    req.body
  );
  const role = await CrudSrv.update(roleId, { name, permissions, description });
  return res.json(role);
};

const remove = async (req: Request, res: Response) => {
  const { roleId } = ValChecker.checkMissingFields(['roleId'], req.params);
  await CrudSrv.remove(roleId);
  return res.json({ message: 'Role deleted!' });
};

const create = async (req: Request, res: Response) => {
  const {
    name,
    permissions = [],
    description = '',
  } = ValChecker.checkMissingFields(
    ['name', 'permissions', 'description'],
    req.body
  );
  const role = await CrudSrv.create({ name, permissions, description });
  return res.json(role);
};

const getById = async (req: Request, res: Response) => {
  const role = await CrudSrv.getOne(req.params.roleId);
  return res.json(role);
};

export default {
  getAll,
  create,
  update,
  remove,
  getById,
};
