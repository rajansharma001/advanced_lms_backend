import { Request, Response } from "express";
import { CourseZodSchema } from "../../../../zod/courseSchema";
import { CourseModel } from "../../../model/courseModel/course.model";
import mongoose from "mongoose";

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid CourseId." });
    }

    const CourseUpdateZodSchema = CourseZodSchema.partial();
    const parsed = CourseUpdateZodSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const courseExsit = await CourseModel.findById(courseId);
    if (!courseExsit) {
      return res.status(404).json({ error: "Course not found." });
    }
    const editCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      { ...parsed.data },
      { new: true },
    );
    return res
      .status(201)
      .json({ success: "Course updated Successfully.", course: editCourse });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
