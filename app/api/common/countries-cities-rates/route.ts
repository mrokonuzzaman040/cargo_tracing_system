import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import ShippingRate from "@/models/ShippingRate";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const shippingRates = await ShippingRate.find().select(
      "country city ratePerKg -_id"
    );
    const groupedData = shippingRates.reduce(
      (acc: any, { country, city, ratePerKg }: any) => {
        if (!acc[country]) acc[country] = [];
        acc[country].push({ city, ratePerKg });
        return acc;
      },
      {}
    );
    return NextResponse.json({ data: groupedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching shipping rates", error },
      { status: 500 }
    );
  }
}
