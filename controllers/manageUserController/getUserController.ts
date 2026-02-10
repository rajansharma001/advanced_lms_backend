import { Request, Response } from "express";
import { UserModel } from "../../model/userModels/user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await UserModel.find()
      .select("-password")
      .sort({ createdAt: -1 });
    if (getUsers.length == 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res
      .status(200)
      .json({ success: "Users fetched successfully.", getUsers });
  } catch (error) {
    console.log("API ERROR! ", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "UserId is required." });
    }
    const getUserById = await UserModel.findById(userId).select("-password");
    if (!getUserById) {
      return res.status(404).json({ error: "User not found." });
    }
    return res
      .status(200)
      .json({ success: "User fetched successfully.", getUserById });
  } catch (error) {
    console.log("API ERROR! ", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
