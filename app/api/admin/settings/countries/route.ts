import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Country from "@/models/Country";
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
    const countries = await Country.find();
    return NextResponse.json({ countries }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching countries", error },
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

  const { name } = await req.json();

  try {
    const country = new Country({ name });
    await country.save();
    return NextResponse.json({ country }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding country", error },
      { status: 500 }
    );
  }
}
