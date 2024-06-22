//TODO: validate process.env here, envalid package?

// cloudinary: {
//   name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   upload_folder: process.env.CLOUDINARY_FOLDER || "bbfallback",
// }

export default {
  env: process.env.NODE_ENV,
  application_port: process.env.PORT,
  db: process.env.MONGO_URI || 'mongodb://localhost:27017/SchoolDb',
  jwt: {
    jwt_secret: process.env.JWT_SECRET || 'akjjkasd',
    login_expiry: process.env.JWT_EXPIRY || '5d',
    refresh_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '30d',
    verify_expiry: process.env.JWT_VERIFY_EXPIRY || '1h',
  },
  mailer: {
    email: process.env.MAILER_EMAIL,
    pw: process.env.MAILER_PW,
  },
  sharp: {
    compression_level: process.env.IMAGE_COMPRESSION_LEVEL || '80',
    image_height: process.env.IMAGE_HEIGHT || '400',
    image_width: process.env.IMAGE_WIDTH || '400',
    image_fit: process.env.IMAGE_FIT || 'outside',
  },
  ik: {
    public_key: process.env.IK_PUBKEY,
    private_key: process.env.IK_PKEY,
    url: process.env.IK_URL,
    tn_width: process.env.IK_TN_WIDTH || '50',
    tn_height: process.env.IK_TN_HEIGHT || '50',
  },
  cacheKey: {
    teacher: 'teacher',
    students: 'students',
    roles: 'roles',
    attendance: 'attendances',
    organizations: 'organizations',
    users: 'users',
    logs: 'logs',
    fees: 'fees',
    classes: 'classes',
    exams: 'exams',
    complaints: 'complaints',
    tokens: 'tokens',
    sessions: 'sessions',
  },
  client_url: process.env.CLIENT_URL || 'http://localhost:3000',
};
