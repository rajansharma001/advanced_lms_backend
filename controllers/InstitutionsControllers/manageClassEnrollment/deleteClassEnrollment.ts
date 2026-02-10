import { Request, Response } from "express";
import mongoose from "mongoose";
import { ClassEnrollmentModel } from "../../../model/institutionModels/classEnrollmentModel";

export const deleteClassEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(enrollId)) {
      return res.status(400).json({ error: "Invalid enrollment id" });
    }

    const deleteEnrollment = await ClassEnrollmentModel.findByIdAndDelete(
      enrollId
    );

    if (!deleteEnrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }

    return res
      .status(200)
      .json({ success: "Enrollment Deleted successfully." });
  } catch (error) {
    console.log("API ERROR!");
    return res.status(500).json({ error: "API ERROR!" });
  }
};
