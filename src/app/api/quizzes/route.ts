import connectMongo from "@/app/lib/mongoose";
import { QuizModel } from "@/models/Quiz";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectMongo();
		const body = await req.json();
		console.log(body);
		const quiz = await QuizModel.create(body);
		if (quiz) {
			return NextResponse.json(
				{ status: "success", quiz, message: "created successfully" },
				{ status: 201 }
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ status: "fail", message: "server error" },
			{ status: 500 }
		);
	}
}
