import { Router } from "express";
import { activityLogger } from "../../middleware/activityLogger";
import {
  changeLiveClassStatus,
  createLiveClass,
  getAllLiveClassById,
  getAllLiveClasses,
  joinLiveClass,
} from "../../controllers/liveClassController/liveClassController";
import { verifyRole } from "../../middleware/verifyRoles";

export const liveClassRoutes = Router();

liveClassRoutes.post(
  "/new-live-class",
  verifyRole(["admin", "instructor"]),
  activityLogger("NEW_LIVE_CLASS"),
  createLiveClass
);

liveClassRoutes.get(
  "/all-live-classes",
  verifyRole(["admin", "instructor", "student"]),
  getAllLiveClasses
);

liveClassRoutes.get(
  "/live-class-by-id/:id",
  verifyRole(["admin", "instructor", "student"]),
  getAllLiveClassById
);

liveClassRoutes.get(
  "/join-live-class/:id",
  verifyRole(["admin", "instructor", "student"]),
  joinLiveClass
);

liveClassRoutes.patch(
  "/change-live-class-status/:id",
  verifyRole(["admin", "instructor"]),
  activityLogger("CHANGE_lIVE_CLASS_STATUS"),
  changeLiveClassStatus
);
