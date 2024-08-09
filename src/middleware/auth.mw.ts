/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { ApiError, TokenUtils } from '@/utils';
import type { AccountType } from '@/config/enums.config';
import { User } from '@/models';
import type { ObjectId } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string;
      orgId: ObjectId;
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
const can = (role?: AccountType | AccountType[] | undefined) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = TokenUtils.validateToken(token);
      const { userId, roles, permissions } = decoded.data as JwtPayload;

      if (role) {
        if (Array.isArray(role)) {
          if (!roles.some((r: string) => role.includes(r))) {
            return next(ApiError.notAuthorized('Role not authorized.'));
          }
        } else {
          if (!roles.includes(role)) {
            return next(ApiError.notAuthorized('Role not authorized.'));
          }
        }
      }

      const user = await User.findById(userId).select('organization');

      if (!user) next(ApiError.notAuthorized('User not authorized.'));
      // if (!permissions.includes(action)) {
      //   return next(ApiError.notAuthorized('Action not authorized.'));
      // }
      req.orgId = user?.organization as unknown as ObjectId;
      req.userId = userId;
      req.userRoles = roles;
      req.userPermissions = permissions;

      return next();
    } else {
      next(ApiError.notAuthorized('Invalid access token'));
    }
  };
};

export default can;
