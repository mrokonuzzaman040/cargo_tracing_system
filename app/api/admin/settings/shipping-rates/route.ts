import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import ShippingRate from "@/models/ShippingRate";
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
    const shippingRates = await ShippingRate.find();
    return NextResponse.json({ shippingRates }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching shipping rates", error },
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

  const { country, city, ratePerKg } = await req.json();

  try {
    const shippingRate = new ShippingRate({ country, city, ratePerKg });
    await shippingRate.save();
    return NextResponse.json({ shippingRate }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding shipping rate", error },
      { status: 500 }
    );
  }
}
