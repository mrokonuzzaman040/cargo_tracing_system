import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { jwtVerify } from "jose";
import User from "@/models/User";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

export const dynamic = "force-dynamic";

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

    const {
      senderName,
      senderPhonePrefix,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhonePrefix,
      receiverPhone,
      country,
      city,
      street,
      district,
      company,
      deliveryMethod,
      pickupAddress,
      payment,
      shippingMethod,
      estimatedFee,
      goodsList,
    } = await req.json();

    const order = new Order({
      userId: user._id,
      sender: {
        name: senderName,
        phonePrefix: senderPhonePrefix,
        phone: senderPhone,
        address: senderAddress,
      },
      receiver: {
        name: receiverName,
        phonePrefix: receiverPhonePrefix,
        phone: receiverPhone,
        country,
        city,
        street,
        district,
        company,
      },
      deliveryMethod,
      pickupAddress,
      payment,
      shippingMethod,
      estimatedFee,
      goodsList,
    });

    await order.save();

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
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
