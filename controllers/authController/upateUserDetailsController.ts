import { Request, Response } from "express";
import { UserSchema } from "../../zod/userSchema";
import { UserModel } from "../../model/userModels/user.model";

const ProfileSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  phone: true,
  profileImage: true,
});

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const checkUser = await UserModel.findById(user.id);
    if (!checkUser) {
      return res.status(404).json({ error: "User not found." });
    }
    const parsed = ProfileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const imageFile = req.file ? req.file.path : checkUser?.profileImage;
    const updatedUser = await UserModel.findByIdAndUpdate(
      checkUser?.id,
      {
        ...parsed.data,
        profileImage: imageFile,
      },
      { new: true },
    );

    return res
      .status(200)
      .json({ success: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.log("API ERROR! ", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
