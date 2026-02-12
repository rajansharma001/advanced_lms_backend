import { Router } from "express";
import { activityLogger } from "../../middleware/activityLogger";
import { addClassEnrollment } from "../../controllers/InstitutionsControllers/manageClassEnrollment/classEnrollmentController";
import { updateClassEnrollment } from "../../controllers/InstitutionsControllers/manageClassEnrollment/updateClassEnrollmentController";
import { deleteClassEnrollment } from "../../controllers/InstitutionsControllers/manageClassEnrollment/deleteClassEnrollment";
import {
  getAllClassEnrollments,
  getClassEnrollmentById,
} from "../../controllers/InstitutionsControllers/manageClassEnrollment/getClassEnrollmentController";
import { verifyRole } from "../../middleware/verifyRoles";

export const classEnrollmentRoutes = Router();

classEnrollmentRoutes.post(
  "/new-enrollment",
  verifyRole(["admin"]),
  activityLogger("NEW_ENROLL"),
  addClassEnrollment,
);

classEnrollmentRoutes.patch(
  "/update-enrollment/:id",
  verifyRole(["admin"]),
  activityLogger("UPDATE_ENROLL"),
  updateClassEnrollment,
);

classEnrollmentRoutes.delete(
  "/delete-enrollment/:id",
  verifyRole(["admin"]),
  activityLogger("DELETE_ENROLL"),
  deleteClassEnrollment,
);

classEnrollmentRoutes.get("/get-enrollment", getAllClassEnrollments);
classEnrollmentRoutes.get("/get-enrollment/:id", getClassEnrollmentById);
