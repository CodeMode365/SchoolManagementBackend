import type { AccountType } from '@/config/enums.config';
import { Role } from '@/models';
import type { RoleType } from '@/types/model';
import { ApiError } from '@/utils';

const getRoles = async () => {
  const roles = await Role.find().populate('permissions');
  return roles;
};

const createRole = async (payload: RoleType) => {
  const role = new Role(payload);
  await role.save();
  return role;
};

const getOneRole = async (id: string) => {
  const role = await Role.findById(id).populate('permissions');
  if (!role) {
    throw ApiError.notFound('Role not found');
  }
  return role;
};

const deleteOneRole = async (id: string) => {
  const role = await Role.findByIdAndDelete(id);
  if (!role) {
    throw ApiError.notFound('Role not found');
  }
  return role;
};

const updateOneRole = async (id: string, payload: RoleType) => {
  const role = await Role.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('permissions');
  if (!role) {
    throw ApiError.notFound('Role not found');
  }
  return role;
};

const getRoleIdByName = async (name: AccountType) => {
  const role = await Role.findOne().where({ name });
  if (!role) return null;
  return role._id;
};

export default {
  getRoles,
  createRole,
  getOneRole,
  deleteOneRole,
  updateOneRole,
  getRoleIdByName,
};
