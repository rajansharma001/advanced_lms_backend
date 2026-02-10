import { Router } from "express";
import { upload } from "../../services/upload";
import { activityLogger } from "../../middleware/activityLogger";
import {
  fileUpload,
  getFileUpload,
} from "../../controllers/uploadController/uploadController";
import { deleteFile } from "../../controllers/uploadController/deleteFIleController";

export const uploadRoutes = Router();

uploadRoutes.post(
  "/upload",
  upload.array("files"),
  activityLogger("FILE_UPLOAD"),
  fileUpload
);

uploadRoutes.delete(
  "/delete-upload/:id",
  activityLogger("DELETE_UPLOAD"),
  deleteFile
);

uploadRoutes.get("/get-upload", getFileUpload);
