import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import PhonePrefix from "@/models/PhonePrefix";
import { validateRole } from "@/lib/validator/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const phonePrefixes = await PhonePrefix.find();
    return NextResponse.json({ phonePrefixes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching phone prefixes", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { country, code } = await req.json();

  if (!country || !code) {
    return NextResponse.json(
      { message: "Country and code are required" },
      { status: 400 }
    );
  }

  try {
    const newPrefix = new PhonePrefix({ country, code });
    await newPrefix.save();
    return NextResponse.json(newPrefix, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding phone prefix" },
      { status: 500 }
    );
  }
}
