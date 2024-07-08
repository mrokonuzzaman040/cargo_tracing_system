import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      console.error("Token is missing");
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  try {
    await jwtVerify(token, SECRET_KEY);
    console.log("Token is valid");

    // If token is valid and user is trying to access login or other public pages, redirect to dashboard
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token is invalid", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
