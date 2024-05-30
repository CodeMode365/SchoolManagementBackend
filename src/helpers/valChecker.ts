import { ApiError } from '@/utils';
import { pick } from 'lodash';

const checkMissingFields = (fields: string[], body: Record<string, string>) => {
  const missingFields = fields.filter((field) => !(field in body));
  if (missingFields.length > 0) {
    const errorMessage = `Missing fields: ${missingFields.join(', ')}`;
    throw ApiError.badRequest(errorMessage);
  }
  return pick(body, fields);
};

export default {
  checkMissingFields,
};
