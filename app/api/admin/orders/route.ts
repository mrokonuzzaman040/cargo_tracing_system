import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { validateRole } from "@/lib/validator/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  const roleValidation = await validateRole(req, "admin");
  if (roleValidation) {
    return NextResponse.json(
      { message: roleValidation.message },
      { status: roleValidation.status }
    );
  }

  const status = req.nextUrl.searchParams.get("status");
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

  try {
    const orders = await Order.find(status ? { status } : {})
      .skip((page - 1) * limit)
      .limit(limit);
    const totalOrders = await Order.countDocuments(status ? { status } : {});

    return NextResponse.json({ orders, totalOrders });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching orders", error },
      { status: 500 }
    );
  }
}
