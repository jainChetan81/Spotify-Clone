import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: NextApiRequest, res: NextApiResponse) {
	//token will exist if user is logged
	const token: JWT | null = await getToken({ req, secret: process.env.JWT_SECRET || "" });
	// const { pathname } = req.nextUrl;
	const pathname: string | undefined = req.url;

	//allow the requests is for the login page if
	// 1.) the token exists
	// 2.) its a request for next-auth session & provider fetching
	if (pathname?.includes("/api/auth") || token) {
		return NextResponse.next();
	}
	if (!token && pathname !== "/login") {
		return NextResponse.redirect("/login");
	}
}
