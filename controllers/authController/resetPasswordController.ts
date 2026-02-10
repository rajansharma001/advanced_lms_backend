import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/userModels/user.model";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    console.log(req.body);

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      _id: string;
    };

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findByIdAndUpdate(decoded._id, {
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};
