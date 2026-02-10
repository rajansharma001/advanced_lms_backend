import { Request, Response } from "express";
import { UserModel } from "../../../model/userModels/user.model";
import { ClassModel } from "../../../model/institutionModels/classModel";
import { ClassEnrollmentModel } from "../../../model/institutionModels/classEnrollmentModel";
import { ClassEnrollmentSchema } from "../../../../zod/classEnrollmentSchema";
import { CourseModel } from "../../../model/courseModel/course.model";

export const addClassEnrollment = async (req: Request, res: Response) => {
  try {
    console.log("1");
    const parsed = ClassEnrollmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    console.log("2");

    if (!parsed.data.classId && !parsed.data.courseId) {
      return res
        .status(400)
        .json({ error: "Class or Course is required to enroll." });
    }

    const checkStudent = await UserModel.findById(parsed.data.studentId);
    console.log("3");

    if (!checkStudent) {
      return res.status(404).json({ error: "Student not found." });
    }

    if (checkStudent.role !== "student") {
      return res.status(409).json({ error: "This user is not a student." });
    }
    console.log("4");

    if (parsed.data.classId) {
      const checkClass = await ClassModel.findById(parsed.data.classId);
      if (!checkClass) {
        return res.status(404).json({ error: "Class not found." });
      }
      const checkEnrollment = await ClassEnrollmentModel.findOne({
        classId: parsed.data.classId,
        studentId: parsed.data.studentId,
      });
      if (checkEnrollment) {
        return res.status(409).json({ error: "Enrollment already exist." });
      }
    } else {
      const checkCourse = await CourseModel.findById(parsed.data.courseId);
      if (!checkCourse) {
        return res.status(404).json({ error: "Course not found." });
      }
      const checkEnrollment = await ClassEnrollmentModel.findOne({
        courseId: parsed.data.courseId,
        studentId: parsed.data.studentId,
      });
      if (checkEnrollment) {
        return res.status(409).json({ error: "Enrollment already exist." });
      }
    }
    console.log("5");

    console.log("6");

    console.log("7");

    const addEnrollment = await ClassEnrollmentModel.create({
      ...parsed.data,
    });
    console.log("8");

    return res.status(201).json({ success: "Enrollment added successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
