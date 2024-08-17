import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import PhonePrefix from "@/models/PhonePrefix";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const phonePrefix = await PhonePrefix.findById(params.id);
    if (!phonePrefix) {
      return NextResponse.json(
        { message: "Phone prefix not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(phonePrefix, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching phone prefix", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { country, code } = await req.json();

  if (!country || !code) {
    return NextResponse.json(
      { message: "Country and code are required" },
      { status: 400 }
    );
  }

  try {
    const phonePrefix = await PhonePrefix.findByIdAndUpdate(
      params.id,
      { country, code },
      { new: true, runValidators: true }
    );

    if (!phonePrefix) {
      return NextResponse.json(
        { message: "Phone prefix not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(phonePrefix, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating phone prefix", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const phonePrefix = await PhonePrefix.findByIdAndDelete(params.id);

    if (!phonePrefix) {
      return NextResponse.json(
        { message: "Phone prefix not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Phone prefix deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting phone prefix", error },
      { status: 500 }
    );
  }
}
