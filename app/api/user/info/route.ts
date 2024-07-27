import { NextResponse } from "next/server";
import dotenv from "dotenv";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

dotenv.config(); // Ensure environment variables are loaded

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (!payload || typeof payload !== "object" || !payload.email) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    const email = payload.email as string;

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract the required information
    const userInfo = {
      name: user.contactName || "Not available",
      phone: user.phone || "Not available",
      address: user.address || "Not available",
      contactEmail: user.email || "Not available",
    };

    return NextResponse.json({ user: userInfo }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
