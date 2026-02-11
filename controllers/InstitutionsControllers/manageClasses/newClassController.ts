import { Request, Response } from "express";
import { ClassModel } from "../../../model/institutionModels/classModel";
import mongoose from "mongoose";
import { classSchema } from "../../../zod/classSchema";

export const newClass = async (req: Request, res: Response) => {
  try {
    const parsed = classSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    const checkClass = await ClassModel.findOne({ code: parsed.data.code });
    if (checkClass) {
      return res.status(409).json({
        error: `Class with code: ${parsed.data.code} already exists.`,
      });
    }

    const addNewClass = await ClassModel.create({
      ...parsed.data,
      instructorIds: parsed.data.instructorIds?.map(
        (id) => new mongoose.Types.ObjectId(id),
      ),
    });

    if (!addNewClass) {
      return res
        .status(409)
        .json({ error: "Something went wrong while creating a new class." });
    }

    return res
      .status(201)
      .json({ success: "Class added successfully.", data: addNewClass });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
