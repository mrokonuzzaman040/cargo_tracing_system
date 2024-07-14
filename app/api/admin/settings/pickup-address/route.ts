import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import PickupAddress from "@/models/PickupAddress";
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
    const pickupAddresses = await PickupAddress.find();
    return NextResponse.json({ pickupAddresses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching pickup addresses", error },
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

  const { address, city, country } = await req.json();

  try {
    const pickupAddress = new PickupAddress({ address, city, country });
    await pickupAddress.save();
    return NextResponse.json({ pickupAddress }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding pickup address", error },
      { status: 500 }
    );
  }
}
