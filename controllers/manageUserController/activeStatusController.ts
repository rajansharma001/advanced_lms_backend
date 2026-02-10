import { Request, Response } from "express";
import { UserSchema } from "../../../zod/userSchema";
import { UserModel } from "../../model/userModels/user.model";

const deactivateSchema = UserSchema.pick({ _id: true, isActive: true });
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const parsed = deactivateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const checkUser = await UserModel.findById(parsed.data._id);
    if (!checkUser) {
      return res
        .status(404)
        .json({ error: "User not found with provided Id." });
    }

    if (!checkUser.isVerified) {
      return res.status(409).json({ error: "User is not verified." });
    }

    const changeActiveStatus = await UserModel.findByIdAndUpdate(
      parsed.data._id,
      {
        isActive: parsed.data.isActive,
      }
    );
    if (!changeActiveStatus) {
      return res
        .status(409)
        .json({ error: "Something went wrong while updating user status" });
    }

    return res
      .status(200)
      .json({ success: "User Active status changed successfully." });
  } catch (error) {
    console.log("API ERROR!,", error);
    return res.status(500).json({ error: "API ERRoR!" });
  }
};
