import { Request, Response } from "express";
import { CourseZodSchema } from "../../../../zod/courseSchema";
import mongoose from "mongoose";
import { CourseModel } from "../../../model/courseModel/course.model";

export const softDelete = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid CourseId." });
    }

    const getCourse = await CourseModel.findById(courseId);
    if (getCourse?.courseStatus === "trash") {
      return res
        .status(409)
        .json({ error: "This course is already in trash." });
    }

    const softDelete = await CourseModel.findOneAndUpdate(
      { _id: courseId, courseStatus: { $ne: "trash" } },
      {
        courseStatus: "trash",
      },
      { new: true }
    );

    if (!softDelete) {
      return res.status(404).json({ error: "Course not found." });
    }

    return res
      .status(200)
      .json({ success: "Course moved to trash successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};

export const restoreSoftDelete = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid CourseId." });
    }

    const restoreSoftDelete = await CourseModel.findOneAndUpdate(
      { _id: courseId, courseStatus: "trash" },
      {
        courseStatus: "draft",
      },
      { new: true }
    );
    if (!restoreSoftDelete) {
      return res.status(404).json({ error: "Course not found." });
    }

    return res.status(200).json({ success: "Course restored successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
