import { NextResponse, NextRequest } from "next/server";
import { validateRole } from "@/lib/validator/auth";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    const adminValidation = await validateRole(req, "admin");
    if (adminValidation instanceof NextResponse) {
      return adminValidation;
    }

    await dbConnect();

    const completedCount = await Order.countDocuments({ status: "completed" });
    const returnedCount = await Order.countDocuments({ status: "returned" });
    const pendingCount = await Order.countDocuments({ status: "pending" });
    const refundCount = await Order.countDocuments({ status: "refund" });
    const paidCount = await Order.countDocuments({ payment: "paid" });

    return NextResponse.json(
      {
        completedCount,
        returnedCount,
        pendingCount,
        refundCount,
        paidCount,
      },
      { status: 200 }
    );
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
