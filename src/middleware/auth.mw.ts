/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { ApiError, TokenUtils } from '@/utils';
import type { AccountType } from '@/config/enums.config';
import { User } from '@/models';
import mongoose, { type ObjectId } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: any;
      orgId: any;
      userRoles: AccountType[];
      userPermissions: string[];
    }
  }
}

/**
 * Middleware function to check user authorization based on JWT token.
 * @param action - The action that requires authorization.
 * @returns Express middleware function
 */
const can = (action: string, role?: AccountType) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = TokenUtils.validateToken(token);
      const { userId, roles, permissions } = decoded.data as JwtPayload;
      const dbUser = await User.findById({ _id: new mongoose.Types.ObjectId(userId) });

      if (role && !roles.include(role)) {
        return next(ApiError.notAuthorized('Role not authorized.'));
      }

      if (role && !roles.includes(role)) return next(ApiError.notAuthorized('Invalid access token.'));
      // if (!active || !permissions.includes(action)) {
      //   return next(ApiError.notAuthorized('Action not authorized.'));
      // }
      if (!dbUser) return next(ApiError.notAuthorized('Invalid access token.'));
      req.orgId = new mongoose.Types.ObjectId(dbUser.organization) as any
      req.userId = new mongoose.Types.ObjectId(userId) as any
      req.userRoles = roles;
      req.userPermissions = permissions;

      console.log(req.orgId, req.userId)
      console.table({ orgId: req.orgId, userId: req.userId })
      return next();
    } else {
      next(ApiError.notAuthorized('Invalid access token'));
    }
  };
};

export default can;
