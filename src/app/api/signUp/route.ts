import connectMongo from "@/app/lib/mongoose";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { MongooseError } from "mongoose";

export async function POST(req: NextRequest) {
	try {
		await connectMongo();
		const body = await req.json();
		const { name, email, password, confirmPassword }: Partial<User> = body;
		if (password != confirmPassword || !password || !confirmPassword) {
			return NextResponse.json(
				{
					status: "fail",
					message: "please provide password and confirm it  ",
				},
				{ status: 400 }
			);
		} else if (!name || !email) {
			return NextResponse.json(
				{
					status: "fail",
					message: "please provide email and name",
				},
				{ status: 400 }
			);
		} else {
			const user: User = await UserModel.create(body);
			console.log(user);
			const SECRET = process.env.SECRET_STR as string;
			const token = jwt.sign({ id: user._id }, SECRET);

			cookies().set("token", token, {
				httpOnly: true,
				expires: 60000 * 60 * 24 * 15,
			});
			return NextResponse.json(
				{ status: "success", user, message: "successfully signed up " },
				{ status: 201 }
			);
		}
	} catch (error) {
		const err = error as MongooseError;
		if (err.message.includes("E11000 duplicate key error collection:")) {
			return NextResponse.json(
				{ status: "fail", message: "email already taken" },
				{ status: 400 }
			);
		} else {
			return NextResponse.json(
				{ status: "fail", message: "something went wrong" },
				{ status: 500 }
			);
			console.log(err.message);
		}
	}
}
