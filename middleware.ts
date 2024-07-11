import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/admin-dashboard") ||
      req.nextUrl.pathname.startsWith("/rider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const role = payload.role;

    const path = req.nextUrl.pathname;

    // Define paths for each role
    const pathsForRoles = {
      admin: ["/admin-dashboard"],
      rider: ["/rider-dashboard"],
      user: ["/dashboard"],
    };

    // If the user is already on the correct path, allow them to proceed
    // @ts-ignore
    if (pathsForRoles[role].some((p: string) => path.startsWith(p))) {
      return NextResponse.next();
    }

    // Redirect users based on their role
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    } else if (role === "rider") {
      return NextResponse.redirect(new URL("/rider-dashboard", req.url));
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/rider-dashboard/:path*",
  ],
};
