import { omit } from 'lodash';

import type {
  AdminSchemaType,
  ParentSchemaType,
  RoleSchemaType,
  StaffSchemaType,
  StudentSchemaType,
  TeacherSchemaType,
  UserSchemaType,
} from '@/types/model';
import { vars } from '@/config';
import { Token, User } from '@/models';
import { RoleService } from '.';
import { ApiError, HashUtils, TokenUtils } from '@/utils';
import { AccountStatusType, AccountType } from '@/config/enums.config';

const USER_STATUS_EXCEPTIONS: Record<string, string> = {};
USER_STATUS_EXCEPTIONS[AccountStatusType.ACTIVE] =
  'Account is already verified.';
USER_STATUS_EXCEPTIONS[AccountStatusType.BLOCKED] = 'Account is banned.';
USER_STATUS_EXCEPTIONS[AccountStatusType.INACTIVE] = 'Account is deactivated.';
USER_STATUS_EXCEPTIONS[AccountStatusType.PENDING] = 'Account is not verified.';
USER_STATUS_EXCEPTIONS[AccountStatusType.DELETED] = 'Account has been deleted.';

const getRolesAndPermissions = (data: RoleSchemaType[]) => {
  let ps: unknown[] = [];
  const rs = data.map((d) => {
    ps.push(d.permissions);
    return d.name;
  });
  ps = [...new Set(ps.flat().map((d: any) => d.name))];
  return { rs, ps };
};

const login = async (payload: {
  email: string;
  password: string;
  username: string;
}) => {
  const { email, password, username } = payload;
  const dbUser = await User.findOne()
    .where({ $or: [{ username }, { email }] })
    .populate({
      path: 'roles',
      // populate: [{ path: 'permissions', model: 'Permission' }],
    });
  if (!dbUser) throw ApiError.notFound('Email not found.');
  if (dbUser.status !== AccountStatusType.ACTIVE)
    throw ApiError.badRequest(USER_STATUS_EXCEPTIONS[dbUser.status]);
  const passCompare = HashUtils.comparePassword(password, dbUser.password);
  if (!passCompare) throw ApiError.notAuthorized('Invalid password.');
  const { rs, ps } = getRolesAndPermissions(dbUser.roles);
  const tokenPayload = {
    userId: dbUser._id as string,
    roles: rs,
    permissions: ps,
  };
  const token = TokenUtils.generateToken(tokenPayload, vars.jwt.login_expiry);
  return {
    user: {
      ...omit(dbUser.toJSON(), ['password', 'roles']),
      roles: rs,
      permissions: ps,
    },
    token: {
      verificationToken: token,
    },
  };
};

const register = async (payload: {
  email: string;
  password: string;
  username: string;
  role: RoleSchemaType;
}) => {
  const { email } = payload;
  const user = await User.findOne().where({ email });
  if (user) throw ApiError.alreadyExists('Email already exists');
  const userRoleId = await RoleService.getRoleIdByName(AccountType.STUDENT);
  if (!userRoleId) throw ApiError.notFound('Role not found');
  const encPass = HashUtils.hashPassword(payload.password);
  const newUser = new User({
    ...payload,
    password: encPass,
    roles: [userRoleId],
  });
  const tokenPayload = { userId: newUser._id as string };
  const verificationToken = TokenUtils.generateToken(
    tokenPayload,
    vars.jwt.verify_expiry
  );
  const verificationLink = `${vars.client_url}/register/verify?token=${verificationToken}&user=${newUser.email}`;
  await newUser.save();
  const newToken = await new Token({
    token: verificationToken,
    user: newUser._id as string,
  }).save();
  // sendEmail(newUser.email, EMAIL_TYPES.CONFIRM_EMAIL, { verificationLink });
  return {
    token: { verifyToken: newToken.token },
    user: omit(newUser.toJSON(), ['password']),
  };
};

const forgetPassword = async (payload: { email: string }) => {
  const { email } = payload;
  const user = await User.findOne().where({ email });
  if (!user) throw ApiError.notFound('Email not found');
  const tokenPayload = { userId: user._id as string };
  const verificationToken = TokenUtils.generateToken(
    tokenPayload,
    vars.jwt.verify_expiry
  );
  const resetLink = `${vars.client_url}/reset-password?token=${verificationToken}&user=${user.email}`;
  // sendEmail(user.email, EMAIL_TYPES.RESET_PASSWORD, { resetLink });
};

const resetPassword = async (payload: {
  email: string;
  token: string;
  newPassword: string;
}) => {
  const { email, token } = payload;
  const user = await User.findOne().where({ email });
  if (!user) throw ApiError.notFound('Email not found');
  const dbToken = await Token.findOne().where({
    $and: [token, { user: user._id }],
  });
  if (!dbToken) throw ApiError.notAuthorized('Token not found');
  const encPass = HashUtils.hashPassword(payload.newPassword);
  await User.findByIdAndUpdate(user._id, { password: encPass });
};

const changePassword = async (payload: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const { userId, oldPassword, newPassword } = payload;
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');
  const passCompare = HashUtils.comparePassword(oldPassword, user.password);
  if (!passCompare) throw ApiError.notAuthorized('Invalid password.');
  const encPass = HashUtils.hashPassword(newPassword);
  await User.findByIdAndUpdate(userId, { password: encPass });
};

const myInfo = async (payload: { userId: string }) => {
  const { userId } = payload;
  const dbUser = await User.findById(userId);
  if (!dbUser) throw ApiError.notFound('User not found');
  const { rs, ps } = getRolesAndPermissions(dbUser.roles);
  return {
    user: {
      ...omit(dbUser.toJSON(), ['password', 'roles']),
      roles: rs,
      permissions: ps,
    },
  };
};

const updateMyInfo = async (
  userInfo: {
    userId: string;
    userRoles: RoleSchemaType[];
  },
  payload: {
    roleSpecific: Partial<
      | TeacherSchemaType
      | ParentSchemaType
      | StudentSchemaType
      | StaffSchemaType
      | AdminSchemaType
    >;
    userSpecific: Partial<UserSchemaType>;
  }
) => {
  const dbUser = await User.findById(userInfo.userId);
  if (!dbUser) throw ApiError.notFound('User not Found!');
  console.log(payload);
};

const isUserActive = async (userId: string) => {
  const dbUser = await User.findById(userId);
  return dbUser?.status === AccountStatusType.ACTIVE;
};

export default {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  myInfo,
  isUserActive,
  updateMyInfo,
};
