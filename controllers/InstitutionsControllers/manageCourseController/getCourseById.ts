import { Request, Response } from "express";
import { CourseModel } from "../../../model/courseModel/course.model";
import mongoose from "mongoose";

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid CourseId." });
    }

    const courseExsit = await CourseModel.findById(courseId);
    if (!courseExsit) {
      return res.status(404).json({ error: "Course not found." });
    }

    const getCourseById = await CourseModel.findById(courseId);

    return res.status(200).json({
      success: "Course by Id fetched successfully.",
      getCourseById,
    });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
