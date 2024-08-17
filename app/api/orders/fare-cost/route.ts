import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FareCost from "@/models/FareCost";

export const dynamic = "force-dynamic";

// Function to handle GET requests
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  if (!country || !city || !state) {
    return NextResponse.json(
      { message: "Country, city, and state are required" },
      { status: 400 }
    );
  }

  try {
    const fareCost = await FareCost.findOne({ country, city, state });

    if (!fareCost) {
      return NextResponse.json(
        { message: "Fare cost not found for the selected location" },
        { status: 404 }
      );
    }

    return NextResponse.json({ fareCost: fareCost.cost }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching fare cost", error },
      { status: 500 }
    );
  }
}
