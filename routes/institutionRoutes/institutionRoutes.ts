import { Router } from "express";
import { verifyRole } from "../../middleware/verifyRoles";
import { verifyToken } from "../../middleware/verifyToken";
import { activityLogger } from "../../middleware/activityLogger";
import {
  getInstitution,
  updateInstitution,
} from "../../controllers/InstitutionsControllers/manageInstitution/updateInstitutionController";
import { upload } from "../../services/upload";

export const institutionRoutes = Router();

institutionRoutes.patch(
  "/add-institution",
  verifyToken,
  verifyRole(["admin"]),
  upload.single("logo"),
  activityLogger("INSTITUION_DETAILS"),
  updateInstitution
);

institutionRoutes.get(
  "/get-institution",
  verifyToken,
  verifyRole(["admin"]),
  getInstitution
);
