import { Request, Response } from "express";
import { UserModel } from "../../model/userModels/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface MyJwtPayload extends jwt.JwtPayload {
  _id: string;
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.TOKEN;

    const secret = process.env.TOKEN_SECRET as string;

    if (!secret) {
      return res.status(404).json({ error: "Token secret not found." });
    }
    const decoded = jwt.verify(token, secret) as MyJwtPayload;

    if (!decoded) {
      return res.status(401).json({ error: "Token did not match." });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Old Password and New Password is required." });
    }

    const checkUser = await UserModel.findById({ _id: decoded.id });
    if (!checkUser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!checkUser.password) {
      return res.status(400).json({ error: "User has no password set." });
    }

    const comparedPassword = await bcrypt.compare(
      oldPassword,
      checkUser.password
    );
    if (!comparedPassword) {
      return res
        .status(409)
        .json({ error: `Password did not match. Please try again.` });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await UserModel.findByIdAndUpdate(checkUser.id, {
      password: hashedPassword,
    });
    return res.status(200).json({ success: "Password Updated successfully." });
  } catch (error) {
    console.log("API Error! :", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
