import connectMongo from "@/app/lib/mongoose";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: any) {
	try {
		await connectMongo();
		const id = params.params.id;
		const user = await UserModel.findById(id);
		if (!user) {
			return NextResponse.json(
				{ status: "fail", message: "not auth" },
				{ status: 401 }
			);
		}
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ status: "fail", message: "server error" },
			{ status: 500 }
		);
	}
}
