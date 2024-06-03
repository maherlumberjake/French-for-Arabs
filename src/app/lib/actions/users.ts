import { UserModel } from "@/models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../mongoose";

export const getProfile = async (req?: NextRequest) => {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const SECRET = process.env.SECRET_STR as unknown as string;
	try {
		await connectMongo();
		if (token) {
			const decoded = jwt.verify(token, SECRET) as JwtPayload;
			const user = await UserModel.findById(decoded.id);
			return user ? user : "error";
		}
	} catch (error) {
		console.log(error);
		return { message: "server error", stats: "failed" };
	}
};
