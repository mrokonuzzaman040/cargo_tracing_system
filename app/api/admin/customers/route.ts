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
    const customers = await User.find({ role: "user" }) // Assuming 'user' role is for customers
      .skip((page - 1) * limit)
      .limit(limit);
    const totalCustomers = await User.countDocuments({ role: "user" });

    return NextResponse.json({ customers, totalCustomers });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching customers", error },
      { status: 500 }
    );
  }
}
