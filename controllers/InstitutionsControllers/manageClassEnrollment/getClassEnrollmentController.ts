import { Request, Response } from "express";
import { ClassEnrollmentModel } from "../../../model/institutionModels/classEnrollmentModel";
import { resolveSoa } from "dns";
import mongoose from "mongoose";

export const getAllClassEnrollments = async (req: Request, res: Response) => {
  try {
    const getClassEnrollments = await ClassEnrollmentModel.find();
    if (!getClassEnrollments) {
      return res.status(404).json({ error: "Enrollments not found." });
    }
    return res.status(200).json({
      success: "Class enrollments fetched successfully.",
      getClassEnrollments,
    });
  } catch (error) {
    console.log("API ERROR!");
    return res.status(500).json({ error: "API ERROR!" });
  }
};

export const getClassEnrollmentById = async (req: Request, res: Response) => {
  try {
    const enrollId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(enrollId)) {
      return res.status(400).json({ error: "Invalid enrollment id" });
    }

    const getClassEnrollmentById =
      await ClassEnrollmentModel.findById(enrollId);
    if (!getClassEnrollmentById) {
      return res.status(404).json({ error: "Enrollment not found." });
    }
    return res.status(200).json({
      success: "Class enrollments fetched successfully.",
      getClassEnrollmentById,
    });
  } catch (error) {
    console.log("API ERROR!");
    return res.status(500).json({ error: "API ERROR!" });
  }
};
