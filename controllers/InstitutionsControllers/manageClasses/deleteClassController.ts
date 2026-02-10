import { Request, Response } from "express";
import { ClassModel } from "../../../model/institutionModels/classModel";

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const classId = req.params.id;
    if (!classId) {
      return res.status(400).json({ error: "classId is required." });
    }

    const checkClass = await ClassModel.findById(classId);
    if (!checkClass) {
      return res.status(404).json({ error: "Class not found." });
    }

    const deleteClass = await ClassModel.findByIdAndDelete(classId);
    if (!deleteClass) {
      return res
        .status(409)
        .json({ error: "Something went wrong while deleting class." });
    }

    return res.status(200).json({ success: "Class deleted successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
