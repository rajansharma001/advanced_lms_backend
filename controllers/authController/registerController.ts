import { Request, Response } from "express";
import { UserSchema, UserType } from "../../../zod/userSchema";
import { UserModel } from "../../model/userModels/user.model";
import { sendMaliVerification } from "../../middleware/sendVerification";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const changePasswordSchema = UserSchema.pick({
	password: true,
});

export const newUser = async (req: Request, res: Response) => {
	try {
		const parsed = UserSchema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.message });
		}

		const existingUser = await UserModel.findOne({ email: parsed.data.email });
		if (existingUser && !existingUser.isVerified) {
			const token = jwt.sign(
				{ _id: existingUser._id },
				process.env.TOKEN_SECRET!,
				{
					expiresIn: "1h",
				}
			);
			const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

			const sendMail = await sendMaliVerification({
				email: parsed.data.email,
				verificationLink,
				firstName: parsed.data.firstName,
			});
			return res.status(409).json({
				error: "User already exists. Please verify your account to login.",
			});
		}

		const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

		const createNewUser = await UserModel.create({
			...parsed.data,
			password: hashedPassword,
		});
		if (!createNewUser) {
			return res
				.status(409)
				.json({ error: "Something went wrong while creating an user." });
		}

		const token = jwt.sign(
			{ _id: createNewUser._id },
			process.env.TOKEN_SECRET!,
			{
				expiresIn: "1h",
			}
		);
		const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

		const sendMail = await sendMaliVerification({
			email: parsed.data.email,
			verificationLink,
			firstName: parsed.data.firstName,
		});
		return res.status(201).json({ success: "User registered successfully." });
	} catch (error) {
		console.log("API Error! :", error);
		return res.status(500).json({ error: "API Error!" });
	}
};
