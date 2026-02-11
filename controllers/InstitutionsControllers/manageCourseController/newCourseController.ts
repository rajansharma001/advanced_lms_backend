import { Request, Response } from "express";
import { CourseModel } from "../../../model/courseModel/course.model";
import mongoose from "mongoose";
import { CourseZodSchema } from "../../../zod/courseSchema";

export const newCourse = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const courseParsed = CourseZodSchema.safeParse(req.body);
    if (!courseParsed.success) {
      session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: courseParsed.error.message });
    }
    // ==========Course Creation Start ========== //
    console.log(5);

    const addCourse = await CourseModel.create({
      ...courseParsed.data,
      instructorIds: courseParsed.data.instructorIds.map(
        (id) => new mongoose.Types.ObjectId(id),
      ),
    });
    console.log(6);

    if (!addCourse) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(409)
        .json({ error: "Error while creating a course. Please try again." });
    }
    // ==========Course Creation End ========== //
    console.log(7);
    await session.commitTransaction();
    return res
      .status(201)
      .json({ success: "New Course Added Successfully.", course: addCourse });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
