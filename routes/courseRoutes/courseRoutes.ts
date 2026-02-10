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

export const courseRoutes = Router();

courseRoutes.post("/new-course", activityLogger("NEW_COURSE"), newCourse);
courseRoutes.patch(
  "/update-course/:id",
  activityLogger("UPDATE_COURSE"),
  updateCourse,
);

courseRoutes.delete(
  "/delete-course/:id",
  activityLogger("DELETE_COURSE"),
  permanentDelete,
);

courseRoutes.patch(
  "/trash-course/:id",
  activityLogger("TRASH_COURSE"),
  softDelete,
);

courseRoutes.patch(
  "/restore-course/:id",
  activityLogger("RESTORE_COURSE"),
  restoreSoftDelete,
);

courseRoutes.get("/get-course", getAllCourses);
courseRoutes.get("/get-course/:id", getCourseById);
