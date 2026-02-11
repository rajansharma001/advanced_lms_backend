import { Request, Response } from "express";
import { ClassEnrollmentModel } from "../../../model/institutionModels/classEnrollmentModel";
import { ClassEnrollmentSchema } from "../../../zod/classEnrollmentSchema";
import { UserModel } from "../../../model/userModels/user.model";
import { ClassModel } from "../../../model/institutionModels/classModel";
import mongoose from "mongoose";

export const updateClassEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(enrollId)) {
      return res.status(400).json({ error: "Invalid enrollment id." });
    }

    const parsed = ClassEnrollmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    if (!parsed.data.classId && !parsed.data.courseId) {
      return res
        .status(400)
        .json({ error: "Class or Course is required to enroll." });
    }
    const checkStudent = await UserModel.findById(parsed.data.studentId);
    if (!checkStudent) {
      return res.status(404).json({ error: "Student not found." });
    }

    if (checkStudent.role !== "student") {
      return res.status(400).json({ error: "This user is not a student." });
    }
    const checkClass = await ClassModel.findById(parsed.data.classId);
    if (!checkClass) {
      return res.status(404).json({ error: "Class not found." });
    }

    const duplicate = await ClassEnrollmentModel.findOne({
      _id: { $ne: enrollId },
      studentId: parsed.data.studentId,
      classId: parsed.data.classId,
    });

    if (duplicate) {
      return res.status(409).json({
        error: "Enrollment already exists for this student and class.",
      });
    }

    const updateEnrollment = await ClassEnrollmentModel.findOneAndReplace(
      { _id: enrollId },
      parsed.data,
      { new: true },
    );

    if (!updateEnrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }

    return res
      .status(200)
      .json({ success: "Enrollment updated successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
