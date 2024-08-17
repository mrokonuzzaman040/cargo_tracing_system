import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import PhonePrefix from "@/models/PhonePrefix";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const phonePrefixes = await PhonePrefix.find().select('country code -_id');
    return NextResponse.json({ phonePrefixes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching phone prefixes", error },
      { status: 500 }
    );
  }
}
