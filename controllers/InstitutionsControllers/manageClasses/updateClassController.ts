import { Request, Response } from "express";
import { ClassModel } from "../../../model/institutionModels/classModel";
import { classSchema } from "../../../zod/classSchema";

export const updateClass = async (req: Request, res: Response) => {
  try {
    const classId = req.params.id;
    if (!classId) {
      return res.status(400).json({ error: "classId is required." });
    }

    const checkClass = await ClassModel.findById(classId);
    if (!checkClass) {
      return res.status(404).json({ error: "Class not found." });
    }

    const parsed = classSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const updateClass = await ClassModel.findByIdAndUpdate(
      classId,
      {
        ...parsed.data,
      },
      {
        new: true,
      },
    );

    if (!updateClass) {
      return res
        .status(409)
        .json({ error: "Something went wrong while updating class details." });
    }
    return res.status(200).json({ success: "Class updated successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
