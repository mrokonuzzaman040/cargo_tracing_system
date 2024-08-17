import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import ShippingRate from "@/models/ShippingRate";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;
  const { country, city, ratePerKg } = await req.json();

  if (!country || !city || !ratePerKg) {
    return NextResponse.json(
      { message: "Country, city, and rate per Kg are required" },
      { status: 400 }
    );
  }

  try {
    const updatedRate = await ShippingRate.findByIdAndUpdate(
      id,
      { country, city, ratePerKg },
      { new: true }
    );
    return NextResponse.json(updatedRate, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating shipping rate", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  try {
    await ShippingRate.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Shipping rate deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting shipping rate", error },
      { status: 500 }
    );
  }
}
