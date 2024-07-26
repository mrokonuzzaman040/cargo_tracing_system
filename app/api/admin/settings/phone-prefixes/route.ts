import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import PhonePrefix from "@/models/PhonePrefix";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    const phonePrefixes = await PhonePrefix.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await PhonePrefix.countDocuments();

    return NextResponse.json(
      {
        phonePrefixes,
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
      { message: "Error adding phone prefix", error },
      { status: 500 }
    );
  }
}
