import { User } from '@/models';
import { CrudService } from '@/services';
import { ApiError } from '@/utils';
import type { UserSchemaType } from '@/types/model';
import type { Request, Response } from 'express';

const UserCrudSrv = new CrudService<UserSchemaType>(User);

const getUserInfo = async (req: Request, res: Response) => {
  console.log('request received');
  const currentUser = req.userId;
  const { userId } = req.params;
  if (!currentUser || !userId)
    return res.status(400).json({ error: 'Invalid request' });
  const user = await UserCrudSrv.getOne(userId);
  console.log(user);
  if (!user) throw ApiError.notFound('User not found!');
  return res.json(user);
};

export default { getUserInfo };
