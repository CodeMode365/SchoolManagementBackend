import { StatusCode } from '.';

const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
} = StatusCode;

class ApiError {
  private statusCode: number;
  private message: unknown;
  private description: string;
  constructor(code: number, message: unknown, description: string) {
    this.statusCode = code;
    this.message = message;
    this.description = description;
  }

  static badRequest(msg: unknown) {
    return new ApiError(BAD_REQUEST.code, msg, NOT_FOUND.description);
  }

  static notFound(msg: unknown) {
    return new ApiError(NOT_FOUND.code, msg, NOT_FOUND.description);
  }

  static alreadyExists(msg: unknown) {
    return new ApiError(CONFLICT.code, msg, CONFLICT.description);
  }

  static internalError(msg: unknown) {
    return new ApiError(
      INTERNAL_SERVER_ERROR.code,
      msg,
      INTERNAL_SERVER_ERROR.description
    );
  }

  static notAuthorized(msg: unknown) {
    return new ApiError(UNAUTHORIZED.code, msg, UNAUTHORIZED.description);
  }
}

export default ApiError;
