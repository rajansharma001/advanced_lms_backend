import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyResetPasswordToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      _id: string;
    };

    // If token is valid, send success.
    return res.status(200).json({
      message: "Token verified",
      userId: decoded._id,
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};
