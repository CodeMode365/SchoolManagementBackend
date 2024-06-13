import { ValChecker } from '@/helpers';
import { Event } from '@/models';
import { CrudService } from '@/services';
import type { EventSchemaType } from '@/types/model';
import type { Response, Request } from 'express';

const CrudSrv = new CrudService<EventSchemaType>(Event);

const get = async (req: Request, res: Response) => {
  const events = await CrudSrv.getAll({}, { page: 1, limit: 10 });
  return res.json(events);
};
const add = async (req: Request, res: Response) => {
  const payload = ValChecker.checkMissingFields(
    [
      'title',
      'description',
      'startDate',
      'endDate',
      'status',
      'location',
      'createdBy',
      'organizer',
    ],
    req.body
  );
  const event = await CrudSrv.create(payload);
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
  get,
};
