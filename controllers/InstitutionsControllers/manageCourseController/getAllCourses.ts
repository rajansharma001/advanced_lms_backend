import { Request, Response } from "express";
import { CourseModel } from "../../../model/courseModel/course.model";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const getCourses = await CourseModel.find();

    return res.status(200).json({
      success: "All Course fetched successfully.",
      getCourses,
    });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
