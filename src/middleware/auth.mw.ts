import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { ApiError, TokenUtils } from '@/utils';
import { AuthService } from '@/services';
import type { AccountType } from '@/config/enums.config';

/**
 * Middleware function to check user authorization based on JWT token.
 * @param action - The action that requires authorization.
 * @returns Express middleware function
 */
const can = (action: string, role: AccountType) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = TokenUtils.validateToken(token);
      const { userId, roles, permissions } = decoded.data as JwtPayload;

      const active = await AuthService.isUserActive(userId);

      if (!active || !permissions.includes(action) || !roles.includes(role)) {
        return next(ApiError.notAuthorized('Action not authorized.'));
      }

      req.body.userId = userId;
      req.body.userRoles = roles;
      req.body.userPermissions = permissions;
      return next();
    } else {
      next(ApiError.notAuthorized('Invalid access token'));
    }
  };
};

export default can;
