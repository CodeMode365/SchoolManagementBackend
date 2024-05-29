import { ApiError } from '@/utils';

const checkMissingFields = (fields: string[], body: Record<string, string>) => {
  const missingFields = fields.filter((field) => !(field in body));
  if (missingFields.length > 0) {
    const errorMessage = `Missing fields: ${missingFields.join(', ')}`;
    throw ApiError.badRequest(errorMessage);
  }
};

export default {
  checkMissingFields,
};
