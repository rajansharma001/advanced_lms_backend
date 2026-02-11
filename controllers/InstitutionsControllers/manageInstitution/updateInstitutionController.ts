import { Request, Response } from "express";
import { InstitutionSchema } from "../../../zod/institutionSchema";
import { InstitutionModel } from "../../../model/institutionModels/institutionModel";

export const updateInstitution = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const parsed = InstitutionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const checkExist = await InstitutionModel.findOne();
    if (checkExist) {
      const imageFile = req.file ? req.file.path : checkExist.logo;
      const updateInstitution = await InstitutionModel.findByIdAndUpdate(
        checkExist._id,
        {
          ...parsed.data,
          logo: imageFile,
        },
        { new: true },
      );
      if (!updateInstitution) {
        return res.status(409).json({
          error: "Something went wrong while updating Institution details.",
        });
      }
      return res
        .status(200)
        .json({ success: "Institution Details updated successfully." });
    } else {
      if (!req.file) {
        return res.status(400).json({ error: "Logo is required." });
      }
      const imageFile = req.file.path || "";
      const addNew = await InstitutionModel.create({
        ...parsed.data,
        logo: imageFile,
      });

      if (!addNew) {
        return res.status(409).json({
          error: "Something went wrong while adding Institution details.",
        });
      }
      return res
        .status(201)
        .json({ success: "Institution added successfully." });
    }
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};

export const getInstitution = async (req: Request, res: Response) => {
  try {
    const getInstitute = await InstitutionModel.findOne();
    if (!getInstitute) {
      return res.status(404).json({ error: "Institution details not found." });
    }

    return res.status(200).json({
      success: "Institution detailed fetched successfully.",
      getInstitute,
    });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
