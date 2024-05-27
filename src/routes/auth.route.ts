import {
  LogIn,
  LogOut,
  Register,
  changePassword,
  createNewRole,
  deleteAccount,
  deleteRole,
  deleteSession,
  forgetPassword,
  getAllSession,
  getRoles,
  myInfo,
  refreshToken,
  resetPassword,
  revokeToken,
  setup2Fa,
  updateMyInfo,
  updateRole,
  verify2Fa,
} from "@/controller/auth.route";
import { Router } from "express";

const route = Router();

//registration
route.post("/register", Register);

/*
route.post("/register/teacher", registerTeacher);
route.post("/register/student", registerStudent);
route.post("/register/parent", registerParent);
route.post("/register/guardian", registerGuardian);
route.post("/register/admin", registerAdmin);
*/

//login
route.post("/login", LogIn);
route.post("/logout", LogOut);

//password management
route.post("/forget-password", forgetPassword);
route.post("/reset-password", resetPassword);
route.post("/change-password", changePassword);

//user profile handling
route.get("/me", myInfo);
route.put("/me", updateMyInfo);
route.delete("/me", deleteAccount);

//session management
route.get("/sessions", getAllSession);
route.delete("/sessions/:sessionId", deleteSession);

//Role management
route.get("/roles", getRoles);
route.post("/roles", createNewRole);
route.put("/roles/:roleId", updateRole);
route.delete("/roles/:roleId", deleteRole);

//Token management
route.post("/token/refresh", refreshToken);
route.post("revoke", revokeToken);

//Two-Factor Authentication
route.get("/2fa/setup", setup2Fa);
route.get("/2fa/verify", verify2Fa);

export default route;
