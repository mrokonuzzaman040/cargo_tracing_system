import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export async function validateUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is missing" },
      { status: 401 }
    );
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const email = payload.email as string;
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return { user, payload };
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function validateRole(req: NextRequest, requiredRole: string) {
  const result = await validateUser(req);
  if (result instanceof NextResponse) {
    return result;
  }

  const { user, payload } = result;

  if (payload.role !== requiredRole) {
    return NextResponse.json(
      { message: "Insufficient permissions" },
      { status: 403 }
    );
  }

  return user;
}
