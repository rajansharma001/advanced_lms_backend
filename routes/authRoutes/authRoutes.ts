import { Router } from "express";
import { newUser } from "../../controllers/authController/registerController";
import { verifyResetPasswordToken } from "../../middleware/verifyResetPasswordToken";
import { resetPassword } from "../../controllers/authController/resetPasswordController";
import { forgetPassword } from "../../controllers/authController/forgetPasswordController";
import { LoginController } from "../../controllers/authController/loginController";
import { sessionController } from "../../controllers/authController/sessionController";
import { verifyToken } from "../../middleware/verifyToken";
import { changePassword } from "../../controllers/authController/changePasswordController";
import { updateUser } from "../../controllers/authController/upateUserDetailsController";
import { activityLogger } from "../../middleware/activityLogger";
import { upload } from "../../services/upload";
import { verifyAccount } from "../../controllers/authController/verifyAccountController";
import { logoutController } from "../../controllers/authController/LogoutController";
import { verifyRole } from "../../middleware/verifyRoles";

export const authRoutes = Router();

authRoutes.post("/register", activityLogger("Register"), newUser);
authRoutes.post("/login", activityLogger("LOGIN"), LoginController);
authRoutes.post("/logout", logoutController);
authRoutes.post("/forget-password", forgetPassword);
authRoutes.get("/verify-reset-password-email/:token", verifyResetPasswordToken);
authRoutes.post(
  "/reset-password",
  activityLogger("Password_Reset"),
  resetPassword
);
authRoutes.get("/session", verifyToken, sessionController);
authRoutes.post(
  "/change-password",
  verifyToken,
  activityLogger("Password_Change"),
  changePassword
);
authRoutes.patch(
  "/update-user",
  verifyToken,
  verifyRole(["admin"]),
  upload.single("profileImage"),
  activityLogger("Update_User"),
  updateUser
);

authRoutes.patch("/verify-email/:id", verifyAccount);
