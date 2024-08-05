import { AuthService, CrudService } from '@/services';
import { ValChecker } from '@/helpers';
import type { Request, Response } from 'express';
import type { UserSchemaType } from '@/types/model';
import { User } from '@/models';
import mongoose from 'mongoose';

const CrudSrv = new CrudService<UserSchemaType>(User);

export const Register = async (req: Request, res: Response) => {
  const { username, password, email, role } = ValChecker.checkMissingFields(
    ['username', 'password', 'email', 'role'],
    req.body
  );
  const user = await AuthService.register({ username, email, password, role });
  return res.json(user);
};

const LogIn = async (req: Request, res: Response) => {
  const { email, password, username } = ValChecker.checkMissingFields(
    ['email', 'password'],
    req.body
  );
  const user = await AuthService.login({ email, password, username });
  return res.json(user);
};
// const LogOut = () => {};

const forgetPassword = async (req: Request, res: Response) => {
  const { email } = ValChecker.checkMissingFields(['email'], req.body);
  await AuthService.forgetPassword({ email });
  return res.json({ message: 'Please check your email' });
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword } = ValChecker.checkMissingFields(
    ['token', 'email', 'newPassword'],
    req.body
  );
  await AuthService.resetPassword({ email, token, newPassword });
  return res.json({ message: 'Password updated!' });
};

const changePassword = async (req: Request, res: Response) => {
  const { userId, oldPassword, newPassword } = ValChecker.checkMissingFields(
    ['userId', 'oldPassword', 'newPassword'],
    req.body
  );
  await AuthService.changePassword({ userId, oldPassword, newPassword });
  return res.json({ message: 'Password updated!' });
};

const myInfo = async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await AuthService.myInfo(userId);
  return res.json(user);
};
const updateMyInfo = async (req: Request, res: Response) => {
  const { userId, userRoles } = ValChecker.checkMissingFields(
    ['userId', 'userRole'],
    req.body
  );
  const { roleSpecific, userSpecific } = req.body;
  const user = await AuthService.updateMyInfo(
    { userId, userRoles },
    { roleSpecific, userSpecific }
  );
  return res.json(user);
};
const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = ValChecker.checkMissingFields(
    ['refreshToken'],
    req.body
  );
  // const authToken = await AuthService.refreshToken(refreshToken);
  return res.json(refreshToken);
};
const logout = async (req: Request, res: Response) => {
  await AuthService.logout(req.userId);
  return res.json({ message: 'Logout Successful!' });
};

const verifyPassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { password } = ValChecker.checkMissingFields(['password'], req.body);
  const user = await AuthService.verifyPassword(userId, password);
  return res.json(user);
};

const accessOrganization = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { orgId } = ValChecker.checkMissingFields(['orgId'], req.body);
  const updatedUser = await CrudSrv.update(userId, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    organization: new mongoose.Types.ObjectId(orgId) as any,
  });
  return res.json(updatedUser);
};

const myOrganization = async (req: Request, res: Response) => {
  const userId = req.userId;
  const organization = await AuthService.myOrganization(userId);
  return res.json(organization);
};

/*
const getAllSession = () => {};
const deleteSession = () => {};
const revokeToken = () => {};
const setup2Fa = () => {};
const verify2Fa = () => {};
*/

export default {
  Register,
  LogIn,
  forgetPassword,
  resetPassword,
  changePassword,
  myInfo,
  updateMyInfo,
  refreshToken,
  logout,
  verifyPassword,
  myOrganization,
  accessOrganization,
};
