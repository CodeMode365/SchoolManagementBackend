import { Message, User } from '@/models';
import { CrudService } from '@/services';
import type { MessageSchemaType, UserSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';

const MessageCrudSrv = new CrudService<MessageSchemaType>(Message);
const UserCrudSrv = new CrudService<UserSchemaType>(User);

const getPeoples = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { filter } = req.query;
  const { search, page, limit } = JSON.parse(filter as string);
  const filters: FilterQuery<UserSchemaType> = {
    $and: [
      { _id: { $ne: userId } },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };

  const users = await UserCrudSrv.getAll(filters, { page, limit });
  return res.json(users);
};

const getMessages = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { filter } = req.query;
  const { friendId, page, limit = 15 } = JSON.parse(filter as string);
  if (!userId || !friendId)
    return res.status(400).json({ error: 'Invalid request' });

  const filters: FilterQuery<MessageSchemaType> = {
    $and: [
      { $or: [{ sender: userId }, { receiver: userId }] },
      { $or: [{ sender: friendId }, { receiver: friendId }] },
    ],
  };
  const messages = await MessageCrudSrv.getAll(filters, {
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return res.json(messages);
};

export default {
  getMessages,
  getPeoples,
};
