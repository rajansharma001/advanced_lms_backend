import { Request, Response } from "express";
import { UserModel } from "../../model/userModels/user.model";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "UserId is required." });
    }
    const deleteUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res
      .status(200)
      .json({ success: "User fetched successfully.", deleteUser });
  } catch (error) {
    console.log("API ERROR! ", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
