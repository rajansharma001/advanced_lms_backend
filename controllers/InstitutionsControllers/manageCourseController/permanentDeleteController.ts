import { Request, Response } from "express";
import { CourseZodSchema } from "../../../zod/courseSchema";
import mongoose from "mongoose";
import { CourseModel } from "../../../model/courseModel/course.model";

export const permanentDelete = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid CourseId." });
    }

    const courseExsit = await CourseModel.findById(courseId);
    if (!courseExsit) {
      return res.status(404).json({ error: "Course not found." });
    }

    const permanentDelete = await CourseModel.findByIdAndDelete(courseId);
    if (!permanentDelete) {
      return res.status(409).json({
        error:
          "Something went wrong while deleting this course. Please try again.",
      });
    }

    return res
      .status(200)
      .json({ success: "Course permanently deleted successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
