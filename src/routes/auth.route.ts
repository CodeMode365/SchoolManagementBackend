import { AuthController } from '@/controller';
import { can } from '@/middleware';
import { Router } from 'express';

const router = Router();

//registration
router.post('/register', AuthController.Register);
/*
route.post("/register/teacher", registerTeacher);
route.post("/register/student", registerStudent);
route.post("/register/parent", registerParent);
route.post("/register/guardian", registerGuardian);
route.post("/register/admin", registerAdmin);
*/

//login
router.post('/login', AuthController.LogIn);

//password management
router.post('/forget-password', AuthController.forgetPassword);
router.post("/verify-password", AuthController.verifyPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', AuthController.changePassword);

//user profile handling
router.get('/me', can(''), AuthController.myInfo);
router.get('/me/getOrganization', can(''), AuthController.myOrganization);

router.post('/logout', AuthController.logout);
router.post('/token/refresh', AuthController.refreshToken);

router.post('/access/organization', can("SuperAdmin"), AuthController.accessOrganization);
/*

route.put('/me', AuthController.updateMyInfo);
route.delete('/me', AuthController.deleteAccount);

//session management
route.get('/sessions', AuthController.getAllSession);
route.delete('/sessions/:sessionId', AuthController.deleteSession);

//Role management
route.get('/roles', AuthController.getRoles);
route.post('/roles', AuthController.createNewRole);
route.put('/roles/:roleId', AuthController.updateRole);
route.delete('/roles/:roleId', AuthController.deleteRole);

//Token management
route.post('revoke', AuthController.revokeToken);

//Two-Factor Authentication
route.get('/2fa/setup', AuthController.setup2Fa);
route.get('/2fa/verify', AuthController.verify2Fa);
*/

export default router;
