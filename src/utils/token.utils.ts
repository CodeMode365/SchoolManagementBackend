import jwt, { type JwtPayload } from 'jsonwebtoken';
import { vars } from '@/config';
import { ApiError } from '@/utils';

const { jwt_secret, login_expiry, refresh_expiry, verify_expiry } = vars.jwt;

const generateAuthToken = (payload: JwtPayload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: login_expiry });
};

const generateMailingToken = (payload: JwtPayload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: verify_expiry });
};

const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: refresh_expiry });
};

const validateToken = (token: string) => {
  try {
    return { data: jwt.verify(token, jwt_secret) };
  } catch {
    throw ApiError.badRequest('Token expired.');
  }
};

export default {
  generateAuthToken,
  generateMailingToken,
  generateRefreshToken,
  validateToken,
};
