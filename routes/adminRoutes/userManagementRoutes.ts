import { Router } from "express";
import { updateUser } from "../../controllers/manageUserController/updateUserController";
import { newUser } from "../../controllers/manageUserController/newUserController";
import { deleteUser } from "../../controllers/manageUserController/deleteUserController";
import {
  getAllUsers,
  getUserById,
} from "../../controllers/manageUserController/getUserController";
import { activityLogger } from "../../middleware/activityLogger";
import { upload } from "../../services/upload";
import { verifyRole } from "../../middleware/verifyRoles";

export const userManagementRoute = Router();

userManagementRoute.post(
  "/new-user",
  verifyRole(["admin", "instructor"]),
  upload.single("profileImage"),
  activityLogger("New User"),
  newUser,
);

userManagementRoute.patch(
  "/update-user/:id",
  verifyRole(["admin", "instructor"]),
  upload.single("profileImage"),
  activityLogger("User Updated"),
  updateUser,
);

userManagementRoute.delete(
  "/delete-user/:id",
  verifyRole(["admin", "instructor"]),
  activityLogger("New Deleted"),
  deleteUser,
);

userManagementRoute.get("/get-users", getAllUsers);
userManagementRoute.get("/get-user/:id", getUserById);
