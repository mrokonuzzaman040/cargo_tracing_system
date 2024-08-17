import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Account from "@/models/Account"; // Ensure this schema is created
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

  // update the query to get the page and limit from the query string
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

  try {
    const accounts = await Account.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalAccounts = await Account.countDocuments();

    return NextResponse.json({ accounts, totalAccounts });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching account data", error },
      { status: 500 }
    );
  }
}
