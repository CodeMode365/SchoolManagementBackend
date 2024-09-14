import { ValChecker } from '@/helpers';
import { Admission } from '@/models';
import { CrudService } from '@/services';
import type { AdmissionSchemeType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const CrudSrv = new CrudService<AdmissionSchemeType>(Admission);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const { startDate, endDate, search, page, limit } = JSON.parse(
    filter as string
  );
  const filters: FilterQuery<AdmissionSchemeType> = {
    $and: [
      startDate && { createdAt: { $gte: new Date(startDate) } },
      endDate && { createdAt: { $lte: new Date(endDate) } },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };
  const response = await CrudSrv.getAll(filters, { page, limit });
  return res.status(200).json(response);
};

const create = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  const payload = ValChecker.checkMissingFields(
    [
      'firstName',
      'middleName',
      'dateOfBirth',
      'lastName',
      'parents',
      'gender',
      'address',
      'phone',
      'address',
      'phone',
      'class',
    ],
    req.body
  );
  const { lastName, previousSchool } = req.body;
  const response = await CrudSrv.create({
    ...payload,
    lastName,
    previousSchool,
    organization: orgId,
  });
  return res.status(200).json(response);
};

// const getById = async (req: Request, res: Response) => {
//   const response = await CrudSrv.getById(req.params.id);
//   res.status(200).json(response);
// };

// const create = async (req: Request, res: Response) => {
//   const response = await CrudSrv.create(req.body);
//   res.status(200).json(response);
// };

// const update = async (req: Request, res: Response) => {
//   const response = await CrudSrv.update(req.params.id, req.body);
//   res.status(200).json(response);
// };

// const remove = async (req: Request, res: Response) => {
//   const response = await CrudSrv.remove(req.params.id);
//   res.status(200).json(response);
// };

// const bulkAdd = async (req: Request, res: Response) => {
//   const response = await CrudSrv.bulkAdd(req.body);
//   res.status(200).json(response);
// };

// const bulkRemove = async (req: Request, res: Response) => {
//   const response = await CrudSrv.bulkRemove(req.body);
//   res.status(200).json(response);
// };

export default {
  getAll,
  //   getById,
  create,
  //   update,
  //   remove,
  //   bulkAdd,
  //   bulkRemove,
};
