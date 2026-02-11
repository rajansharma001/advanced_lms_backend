import { Request, Response } from "express";
import { UserSchema, UserUpdateSchema } from "../../zod/userSchema";
import { UserModel } from "../../model/userModels/user.model";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(409).json({ error: "UserId is required." });
    }

    const checkUser = await UserModel.findById(userId);
    if (!checkUser) {
      return res.status(404).json({ error: "User not found." });
    }
    const parsed = UserUpdateSchema.safeParse(req.body);

    console.log(parsed.data);

    const imageFile = req.file ? req.file.path : checkUser.profileImage;

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...parsed.data,
        profileImage: imageFile,
      },
      { new: true },
    );

    if (!updateUser) {
      return res
        .status(409)
        .json({ error: "Something went wrong while updating user." });
    }
    return res
      .status(200)
      .json({ success: "User updated successfully.", update: updateUser });
  } catch (error) {
    console.log("API ERROR! ", error);
    return res.status(500).json({ error: "API ERRRO!" });
  }
};
