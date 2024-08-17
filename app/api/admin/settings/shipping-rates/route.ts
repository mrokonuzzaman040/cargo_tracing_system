import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import ShippingRate from "@/models/ShippingRate";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "25");

  try {
    const shippingRates = await ShippingRate.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await ShippingRate.countDocuments();

    return NextResponse.json(
      {
        shippingRates,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching shipping rates", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { country, city, ratePerKg } = await req.json();

  if (!country || !city || !ratePerKg) {
    return NextResponse.json(
      { message: "Country, city, and rate per Kg are required" },
      { status: 400 }
    );
  }

  try {
    const newRate = new ShippingRate({ country, city, ratePerKg });
    await newRate.save();
    return NextResponse.json(newRate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding shipping rate", error },
      { status: 500 }
    );
  }
}
