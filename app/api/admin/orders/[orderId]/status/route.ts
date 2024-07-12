import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { validateRole } from "@/lib/validator/auth";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  await dbConnect();

  const roleValidation = await validateRole(req, "admin");
  if (roleValidation) {
    return NextResponse.json(
      { message: roleValidation.message },
      { status: roleValidation.status }
    );
  }

  const orderId = req.nextUrl.searchParams.get("orderId");
  const { status } = await req.json();

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    order.status = status;
    await order.save();

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating order status", error },
      { status: 500 }
    );
  }
}
