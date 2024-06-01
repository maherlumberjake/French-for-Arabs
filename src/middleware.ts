import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const userToken = req.cookies.get("token")?.value;
	if (userToken && req.nextUrl.pathname.startsWith("/signup")) {
		return Response.redirect(new URL("/articles", req.url));
	} else if (userToken && req.nextUrl.pathname.startsWith("/logIn")) {
		return Response.redirect(new URL("/articles", req.url));
	} else if (!userToken && req.nextUrl.pathname.startsWith("/Profile")) {
		return Response.redirect(new URL("/login", req.url));
	}
}
export const config = {
	matcher: ["/signup", "/logIn", "/Profile"],
};
