import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
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

  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

  try {
    const deliveryMen = await User.find({ role: "rider" }) // Assuming 'rider' role is for delivery personnel
      .skip((page - 1) * limit)
      .limit(limit);
    const totalDeliveryMen = await User.countDocuments({ role: "rider" });

    return NextResponse.json({ deliveryMen, totalDeliveryMen });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching delivery personnel", error },
      { status: 500 }
    );
  }
}
