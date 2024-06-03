import bcrypt from "bcryptjs";
import connectMongo from "@/app/lib/mongoose";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
	try {
		await connectMongo();
		const body = await req.json();
		const { email, password }: Partial<User> = body;
		if (!password || !email) {
			return NextResponse.json(
				{
					status: "fail",
					message: "please provide password and email  ",
				},
				{ status: 400 }
			);
		} else {
			const user = await UserModel.findOne({ email }).select("+password");
			if (!user) {
				return NextResponse.json(
					{ status: "fail", message: "no user found with this email" },
					{ status: 404 }
				);
			}
			if (user && (await bcrypt.compare(password, user.password))) {
				const SECRET = process.env.SECRET_STR as string;
				const token = jwt.sign({ id: user._id }, SECRET);
				const MAX_AGE = process.env.EXP_TIME as unknown as number;
				cookies().set("token", token, {
					maxAge: MAX_AGE,
					httpOnly: true,
				});
				return NextResponse.json(
					{ status: "success", user, message: "successfully logged in " },
					{ status: 200 }
				);
			}
		}
	} catch (error) {
		return NextResponse.json(
			{ status: "fail", message: "something went wrong" },
			{ status: 500 }
		);
	}
}
