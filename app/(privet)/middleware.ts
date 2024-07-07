import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your_secret";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/privet/:path*"], // Protect all routes under /privet
};
