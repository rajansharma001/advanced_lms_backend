import { Request, Response } from "express";
import { ClassModel } from "../../../model/institutionModels/classModel";

export const getClasses = async (req: Request, res: Response) => {
  try {
    const getClasses = await ClassModel.find();
    if (getClasses.length == 0) {
      return res.status(404).json({ error: "Class not found." });
    }

    return res
      .status(200)
      .json({ success: "Class fetched successfully.", getClasses });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const classId = req.params.id;
    console.log("classId:", classId);
    if (!classId) {
      return res.status(400).json({ error: "classId is required." });
    }

    const getClassById = await ClassModel.findById(classId);
    if (!getClassById) {
      return res.status(404).json({ error: "Class not found." });
    }

    return res
      .status(200)
      .json({ success: "Class fetched successfully.", getClassById });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
