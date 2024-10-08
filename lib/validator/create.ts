import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { validateRole } from "@/lib/validator/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const userValidation = await validateRole(req, "user");
    if (userValidation instanceof NextResponse) {
      return userValidation;
    }

    await dbConnect();

    const user = await User.findOne({ email: req.cookies.get("token")?.value });

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
    });

    await order.save();

    return NextResponse.json({ order }, { status: 201 });
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
