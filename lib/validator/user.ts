import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { validateRole } from "./auth";

export async function GET(req: NextRequest) {
  try {
    const userValidation = await validateRole(req, "admin");
    if (userValidation instanceof NextResponse) {
      return userValidation;
    }

    await dbConnect();
    const users = await User.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
