import jwt from 'jsonwebtoken';
import { vars } from '@/config';
import { ApiError } from '@/utils';

const secret = vars.jwt.jwt_secret;

const generateToken = (payload: { userId: string }, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

const validateToken = (token: string) => {
  try {
    return { data: jwt.verify(token, secret) };
  } catch {
    throw ApiError.badRequest('Token expired.');
  }
};

export default {
  generateToken,
  validateToken,
};
