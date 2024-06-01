import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const getProfile = async (req?: NextRequest) => {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const SECRET = process.env.SECRET_STR as unknown as string;
	try {
		if (token) {
			const decoded = jwt.verify(token, SECRET) as JwtPayload;
			const res = await fetch(`http://localhost:3000/api/users/${decoded.id}`, {
				cache: "no-store",
			});
			return res;
		}
	} catch (error) {
		console.log(error);
	}
};
