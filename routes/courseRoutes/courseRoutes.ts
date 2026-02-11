import { Router } from "express";
import { activityLogger } from "../../middleware/activityLogger";
import { newCourse } from "../../controllers/InstitutionsControllers/manageCourseController/newCourseController";
import { updateCourse } from "../../controllers/InstitutionsControllers/manageCourseController/updateCourseController";
import { permanentDelete } from "../../controllers/InstitutionsControllers/manageCourseController/permanentDeleteController";
import {
  restoreSoftDelete,
  softDelete,
} from "../../controllers/InstitutionsControllers/manageCourseController/softDeleteController";
import { getAllCourses } from "../../controllers/InstitutionsControllers/manageCourseController/getAllCourses";
import { getCourseById } from "../../controllers/InstitutionsControllers/manageCourseController/getCourseById";
import { verifyRole } from "../../middleware/verifyRoles";

export const courseRoutes = Router();

courseRoutes.post(
  "/new-course",
  verifyRole(["admin", "instructor"]),
  activityLogger("NEW_COURSE"),
  newCourse,
);
courseRoutes.patch(
  "/update-course/:id",
  verifyRole(["admin", "instructor"]),
  activityLogger("UPDATE_COURSE"),
  updateCourse,
);

courseRoutes.delete(
  "/delete-course/:id",
  verifyRole(["admin", "instructor"]),
  activityLogger("DELETE_COURSE"),
  permanentDelete,
);

courseRoutes.patch(
  "/trash-course/:id",
  verifyRole(["admin", "instructor"]),
  activityLogger("TRASH_COURSE"),
  softDelete,
);

courseRoutes.patch(
  "/restore-course/:id",
  verifyRole(["admin", "instructor"]),
  activityLogger("RESTORE_COURSE"),
  restoreSoftDelete,
);

courseRoutes.get(
  "/get-course",
  verifyRole(["admin", "instructor", "student"]),
  getAllCourses,
);
courseRoutes.get(
  "/get-course/:id",
  verifyRole(["admin", "instructor", "student"]),
  getCourseById,
);
