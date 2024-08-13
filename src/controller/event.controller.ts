import { ValChecker } from '@/helpers';
import { Event } from '@/models';
import { CrudService } from '@/services';
import type { EventSchemaType } from '@/types/model';
import type { Response, Request } from 'express';
import type { FilterQuery } from 'mongoose';
import { Types } from 'mongoose';

const CrudSrv = new CrudService<EventSchemaType>(Event);

const getAll = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const { orgId } = req;
  const { startDate, endDate, page, limit, method, search } = JSON.parse(
    filter as string
  );
  const filters: FilterQuery<EventSchemaType> = {
    $and: [
      { organizer: { $eq: orgId } },
      startDate && { createdAt: { $gte: new Date(startDate) } },
      endDate && { createdAt: { $lte: new Date(endDate) } },
      method && { method },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };

  const events = await CrudSrv.getAll(filters, { page, limit });
  return res.json(events);
};

const add = async (req: Request, res: Response) => {
  const { userId, orgId } = req;
  const payload = ValChecker.checkMissingFields(
    ['title', 'description', 'startDate', 'endDate', 'status', 'location'],
    req.body
  );
  const event = await CrudSrv.create({
    ...payload,
    organizer: orgId,
    createdBy: new Types.ObjectId(userId) as any,
  });
  return res.json(event);
};
const remove = async (req: Request, res: Response) => {
  const { eventId } = ValChecker.checkMissingFields(['eventId'], req.params);
  await CrudSrv.remove(eventId);
  return res.json({ message: 'Event deleted!' });
};
const update = async (req: Request, res: Response) => {
  const { eventId } = ValChecker.checkMissingFields(['eventId'], req.params);
  const { title, description, startDate, endDate, status, location } =
    ValChecker.checkMissingFields(
      ['title', 'description', 'startDate', 'endDate', 'status', 'location'],
      req.body
    );
  const event = await CrudSrv.update(eventId, {
    title,
    description,
    startDate,
    endDate,
    status,
    location,
  });
  return res.json(event);
};

export default {
  add,
  remove,
  update,
  getAll,
};
