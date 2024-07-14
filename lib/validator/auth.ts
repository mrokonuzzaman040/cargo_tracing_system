import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export async function validateRole(req: NextRequest, requiredRole: string) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return { status: 401, message: "Authorization token is missing" };
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (!payload || typeof payload !== "object" || !payload.email) {
      return { status: 401, message: "Invalid token payload" };
    }

    await dbConnect();
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    if (user.role !== requiredRole) {
      return { status: 403, message: "Forbidden: Insufficient role" };
    }

    return null; // No validation error
  } catch (error) {
    console.error("Token validation error:", error);
    return { status: 401, message: "Invalid token" };
  }
}
