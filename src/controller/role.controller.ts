import { Role } from '@/models';
import { CrudService } from '@/services';
import type { RoleSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const CrudSrv = new CrudService<RoleSchemaType>(Role);

const getAllRoles = async (req: Request, res: Response) => {
  const roles = await CrudSrv.getAll({}, { page: 1, limit: 10 });
  return res.json(roles);
};
const getRoleByName = async (req: Request, res: Response) => {};
const updateRole = async (req: Request, res: Response) => {};
const removeRole = async (req: Request, res: Response) => {};
const createRole = async (req: Request, res: Response) => {};

export default {
  getAllRoles,
  getRoleByName,
  createRole,
  updateRole,
  removeRole,
};
