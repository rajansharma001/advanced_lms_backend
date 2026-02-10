import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/userModels/user.model";

interface MyJwtPayload extends jwt.JwtPayload {
	_id: string;
}

export const verifyAccount = async (req: Request, res: Response) => {
	try {
		const verifyId = req.params.id;
		if (!verifyId) {
			return res
				.status(400)
				.json({ error: "Verification link expired or link missmatch." });
		}

		console.log();

		const secret = process.env.TOKEN_SECRET as string;
		if (!secret) {
			return res.status(404).json({ error: "Token secret not found." });
		}
		const decodeToken = jwt.verify(verifyId, secret) as MyJwtPayload;
		if (!decodeToken) {
			return res.status(401).json({ error: "Token did not match." });
		}

		const getUser = await UserModel.findById(decodeToken._id);
		if (!getUser) {
			return res.status(404).json({ error: "User not found." });
		}

		if (getUser.isVerified) {
			return res.status(409).json({
				error: "Your account is already verified. Please proceed to login.",
			});
		}

		const updateStatus = await UserModel.findByIdAndUpdate(
			getUser._id,
			{
				isVerified: true,
			},
			{ new: true }
		);

		return res
			.status(200)
			.json({ success: "Your account has been activated successfully." });
	} catch (error) {
		console.log("API ERROR!", error);
		return res.status(500).json({ error: "API ERROR!" });
	}
};
