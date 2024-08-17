import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  const { reason } = await req.json();

  try {
    await dbConnect();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        { message: "Only pending orders can be canceled" },
        { status: 400 }
      );
    }

    order.status = "canceled";
    if (reason) {
      // @ts-ignore
      order.cancellationReason = reason;
    }

    await order.save();

    return NextResponse.json(
      { message: "Order canceled successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error canceling order", error },
      { status: 500 }
    );
  }
}
