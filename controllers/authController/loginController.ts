import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/userModels/user.model";
import bcrypt from "bcrypt";
import { UserSchema, UserType } from "../../../zod/userSchema";
import { z } from "zod";

const loginSchema = UserSchema.pick({
	email: true,
	password: true,
});
type LoginType = z.infer<typeof loginSchema>;

export const LoginController = async (req: Request, res: Response) => {
	try {
		const parsed = loginSchema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.message });
		}
		const { email, password }: LoginType = parsed.data;

		const getUser = await UserModel.findOne({ email });
		if (!getUser) {
			return res.status(403).json({ error: `${email} is not found.` });
		}

		if (!getUser.isVerified) {
			return res
				.status(401)
				.json({ error: `your email: ${email} is not verified.` });
		}

		if (!getUser.password) {
			return res.status(500).json({ error: "User password not set" });
		}
		const comparedPassword = await bcrypt.compare(password, getUser.password);
		if (!comparedPassword) {
			return res
				.status(401)
				.json({ error: `Password did not match. Please try again.` });
		}

		const secret = process.env.TOKEN_SECRET as string;
		const token = jwt.sign({ id: getUser._id }, secret, { expiresIn: "1h" });

		return res
			.cookie("TOKEN", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 1000,
			})
			.status(200)
			.json({ success: `Logged in successfully.`, user: getUser });
	} catch (error) {
		console.log("Bad Request for Login", error);
		return res.status(500).json({ error: "Bad Request for Login." });
	}
};
