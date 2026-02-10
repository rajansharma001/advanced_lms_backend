import { Router } from "express";
import { newClass } from "../../controllers/InstitutionsControllers/manageClasses/newClassController";
import { updateClass } from "../../controllers/InstitutionsControllers/manageClasses/updateClassController";
import { activityLogger } from "../../middleware/activityLogger";
import {
  getClassById,
  getClasses,
} from "../../controllers/InstitutionsControllers/manageClasses/getClassController";
import { deleteClass } from "../../controllers/InstitutionsControllers/manageClasses/deleteClassController";

export const classRoutes = Router();

classRoutes.post("/new-class", activityLogger("NEW_CLASS"), newClass);
classRoutes.patch(
  "/update-class/:id",
  activityLogger("UPDATE_CLASS"),
  updateClass
);
classRoutes.delete("/delete-class/:id", deleteClass);
classRoutes.get("/get-class/:id", getClassById);
classRoutes.get("/get-class", getClasses);
