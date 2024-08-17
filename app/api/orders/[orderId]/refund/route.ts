import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

interface Params {
  orderId: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { orderId } = params;

  try {
    await dbConnect();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status !== "returned") {
      return NextResponse.json(
        { message: "Only returned orders can request a refund" },
        { status: 400 }
      );
    }

    if (order.refundCalled) {
      return NextResponse.json(
        { message: "Refund already requested for this order" },
        { status: 400 }
      );
    } else {
      order.refundCalled = true;
    }

    await order.save();

    return NextResponse.json(
      { message: "Refund requested successfully", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error requesting refund:", error);
    return NextResponse.json(
      { message: "Error requesting refund", error },
      { status: 500 }
    );
  }
}
