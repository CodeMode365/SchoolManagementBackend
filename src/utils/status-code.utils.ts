const HttpStatusCode = {
  OK: {
    code: 200,
    description: 'The request has succeeded.',
    type: 'Success',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  CREATED: {
    code: 201,
    description:
      'The request has been fulfilled and has resulted in one or more new resources being created.',
    type: 'Success',
    methods: ['POST'],
  },
  ACCEPTED: {
    code: 202,
    description:
      'The request has been accepted for processing, but the processing has not been completed.',
    type: 'Success',
    methods: ['POST', 'PUT'],
  },
  NO_CONTENT: {
    code: 204,
    description:
      'The server successfully processed the request and is not returning any content.',
    type: 'Success',
    methods: ['DELETE'],
  },
  BAD_REQUEST: {
    code: 400,
    description:
      'The server cannot or will not process the request due to an apparent client error.',
    type: 'Client Error',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  UNAUTHORIZED: {
    code: 401,
    description:
      'The request has not been applied because it lacks valid authentication credentials for the target resource.',
    type: 'Client Error',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  FORBIDDEN: {
    code: 403,
    description:
      'The server understood the request, but refuses to authorize it.',
    type: 'Client Error',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  NOT_FOUND: {
    code: 404,
    description: 'The server has not found anything matching the Request-URI.',
    type: 'Client Error',
    methods: ['GET'],
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    description:
      'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.',
    type: 'Client Error',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  CONFLICT: {
    code: 409,
    description: 'The resource contains the conflicting information',
    type: 'Client Error',
    methods: ['POST'],
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: 'Server Error',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    description:
      'The server is currently unable to handle the request due to a temporary overload or maintenance of the server.',
    type: 'Server Error',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
};

export default HttpStatusCode;
