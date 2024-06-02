import { ValChecker } from '@/helpers';
import { ParentService } from '@/services';
import type { ParentSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  const parents = await ParentService.getAll();
  return res.json(parents);
};

const parentsByOrg = async (req: Request, res: Response) => {
  const { orgId } = ValChecker.checkMissingFields(['orgId'], req.params);
  const parents = await ParentService.getByOrg(orgId);
  return res.json(parents);
};

const getChildren = async (req: Request, res: Response) => {
  const { parentId } = ValChecker.checkMissingFields(['parentId'], req.params);
  const children = await ParentService.getChildren(parentId);
  return res.json(children);
};

const add = async (req: Request, res: Response) => {
  const { firstName, lastName, gender, address, phone } =
    ValChecker.checkMissingFields(
      ['firstName, lastName', 'gender', 'address', 'phone'],
      req.body
    );
  const { middleName, email } = req.body;
  const newParent = await ParentService.add({
    firstName,
    lastName,
    gender,
    address,
    phone,
    middleName,
    email,
  } as ParentSchemaType);
  return res.json(newParent);
};

// const update = async (req: Request, res: Response) => {};

const remove = async (req: Request, res: Response) => {
  const { parentId } = ValChecker.checkMissingFields(['parentId'], req.params);
  await ParentService.remove(parentId);
  return res.json({ message: 'Parent deleted!' });
};

/*
//bulk operation
const bulkAdd = async (req: Request, res: Response) => {};
const bulkRemove = async (req: Request, res: Response) => {};
*/

export default {
  getAll,
  parentsByOrg,
  getChildren,
  remove,
  add,
};
