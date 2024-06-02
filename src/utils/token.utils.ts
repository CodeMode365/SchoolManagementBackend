import jwt, { type JwtPayload } from 'jsonwebtoken';
import { vars } from '@/config';
import { ApiError } from '@/utils';

const secret = vars.jwt.jwt_secret;

const generateToken = (payload: JwtPayload, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

const validateToken = (token: string) => {
  try {
    return { data: jwt.verify(token, secret) };
  } catch {
    throw ApiError.badRequest('Token expired.');
  }
};

// interface CustomJwtPayload<T extends JwtPayload = JwtPayload> extends T {
//   userId: string;
//   roles: AccountType[];
//   permissions: unknown[];
// }

export default {
  generateToken,
  validateToken,
};
