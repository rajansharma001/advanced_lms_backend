import { Request, Response } from "express";
import { UserSchema } from "../../zod/userSchema";
import { UserModel } from "../../model/userModels/user.model";

export const newUser = async (req: Request, res: Response) => {
  try {
    const parsed = UserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const checkUser = await UserModel.findOne({ email: parsed.data.email });
    if (checkUser) {
      return res.status(409).json({
        error: `User already exisit with email: ${parsed.data.email}`,
      });
    }

    const imageFile =
      req.file?.path || "https://avatars.githubusercontent.com/u/124599?v=4";

    const addUser = await UserModel.create({
      ...parsed.data,
      profileImage: imageFile,
    });

    if (!addUser) {
      return res
        .status(409)
        .json({ error: "Something went wrong while adding a user." });
    }
    return res.status(201).json({ success: "User created successfully." });
  } catch (error) {
    console.log("API ERROR! ", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
