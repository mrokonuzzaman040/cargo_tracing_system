import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import City from "@/models/City";
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
    const cities = await City.find();
    return NextResponse.json({ cities }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching cities", error },
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

  const { name, country } = await req.json();

  try {
    const city = new City({ name, country });
    await city.save();
    return NextResponse.json({ city }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding city", error },
      { status: 500 }
    );
  }
}
