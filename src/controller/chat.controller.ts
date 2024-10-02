import { Message, User } from '@/models';
import { CrudService } from '@/services';
import type { MessageSchemaType, UserSchemaType } from '@/types/model';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';

const MessageCrudSrv = new CrudService<MessageSchemaType>(Message);
const UserCrudSrv = new CrudService<UserSchemaType>(User);

const getPeoples = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { filter } = req.query;
  const { search, page, limit } = JSON.parse(filter as string);
  const filters: FilterQuery<UserSchemaType> = {
    $and: [
      { _id: { $ne: new mongoose.Types.ObjectId(userId) } },
      search && { $text: { $search: search } },
    ].filter(Boolean),
  };

  const users = await UserCrudSrv.getAll(filters, { page, limit });
  return res.json(users);
};

const getMessages = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { friendId } = req.params;
  const { filter } = req.query;
  const { page = 1, limit = 15 } = JSON.parse(filter as string);

  if (!userId || !friendId)
    return res.status(400).json({ error: 'Invalid request' });

  const filters: FilterQuery<MessageSchemaType> = {
    $or: [
      {
        $and: [
          { sender: new mongoose.Types.ObjectId(userId) },
          { receiver: new mongoose.Types.ObjectId(friendId) },
        ],
      },
      {
        $and: [
          { sender: new mongoose.Types.ObjectId(friendId) },
          { receiver: new mongoose.Types.ObjectId(userId) },
        ],
      },
    ],
  };

  const messages = await MessageCrudSrv.getAll(filters, {
    page,
    limit,
    sort: { createdAt: -1 },
  });

  return res.json(messages);
};

const sendMessage = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { receiver, content } = req.body;
  if (!userId || !receiver || !content)
    return res.status(400).json({ error: 'Invalid request' });
  const newMessage = await MessageCrudSrv.create({
    sender: new mongoose.Types.ObjectId(userId as string),
    receiver: new mongoose.Types.ObjectId(receiver as string),
    content,
  });
  return res.json(newMessage);
};

const clearChat = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { friendId } = req.params;

  if (!userId || !friendId)
    return res.status(400).json({ error: 'Invalid request' });

  const filtesr: FilterQuery<MessageSchemaType> = {
    $or: [
      {
        $and: [
          { sender: new mongoose.Types.ObjectId(userId) },
          { receiver: new mongoose.Types.ObjectId(friendId) },
        ],
      },
      {
        $and: [
          { sender: new mongoose.Types.ObjectId(friendId) },
          { receiver: new mongoose.Types.ObjectId(userId) },
        ],
      },
    ],
  };

  await MessageCrudSrv.bulkRemove(filtesr);

  return res.json({ message: 'Chat cleared!' });
};

export default {
  getMessages,
  getPeoples,
  sendMessage,
  clearChat,
};
