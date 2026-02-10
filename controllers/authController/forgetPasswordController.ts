import { Request, Response } from "express";
import { UserModel } from "../../model/userModels/user.model";
import jwt from "jsonwebtoken";
import { sendForgetPasswordVerification } from "../../middleware/sendVerification";

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res
        .status(404)
        .json({ error: `User with email: ${email} is not found.` });
    }

    const token = jwt.sign({ _id: checkUser._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    const verificationLink = `${process.env.CLIENT_URL}/verify-reset-password-email/${token}`;

    const sendMail = await sendForgetPasswordVerification({
      email: email,
      verificationLink,
      firstName: checkUser.firstName,
    });
    return res
      .status(200)
      .json({ success: "Verification link sent successfully." });
  } catch (error) {
    console.log("API ERROR! :", error);
    return res.status(500).json({ error: "API Error!" });
  }
};
