import { NextResponse, NextRequest } from "next/server";
import dotenv from "dotenv";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { jwtVerify } from "jose";
import User from "@/models/User";

dotenv.config(); // Ensure environment variables are loaded

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export async function GET(
  req: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
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

    const email = payload.email;

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { orderNumber } = params;

    const order = await Order.findOne({ orderNumber, userId: user._id });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ status: order.status }, { status: 200 });
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
