import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import ShippingMethod from "@/models/ShippingMethod";
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

  try {
    const shippingMethods = await ShippingMethod.find();
    return NextResponse.json({ shippingMethods }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching shipping methods", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const roleValidation = await validateRole(req, "admin");
  if (roleValidation) {
    return NextResponse.json(
      { message: roleValidation.message },
      { status: roleValidation.status }
    );
  }

  const { name, description } = await req.json();

  try {
    const shippingMethod = new ShippingMethod({ name, description });
    await shippingMethod.save();
    return NextResponse.json({ shippingMethod }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding shipping method", error },
      { status: 500 }
    );
  }
}
