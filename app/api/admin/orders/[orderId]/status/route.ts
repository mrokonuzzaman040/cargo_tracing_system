// app/api/admin/orders/[orderId]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { validateRole } from "@/lib/validator/auth";
import { sendEmail } from "@/lib/email";

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
    const order = await Order.findById(orderId).populate("userId");
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    order.status = status;
    await order.save();

    // Send email notification
    const user = await User.findById(order.userId);
    if (user) {
      const emailSubject = "Order Status Updated";
      const emailText = `Your order with ID ${order._id} has been updated to ${status}.`;
      const emailHtml = `<p>Your order with ID <strong>${order._id}</strong> has been updated to <strong>${status}</strong>.</p>`;

      await sendEmail({
        to: user.email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating order status", error },
      { status: 500 }
    );
  }
}
