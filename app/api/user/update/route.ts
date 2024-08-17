import { NextResponse } from "next/server";

import dotenv from "dotenv";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

dotenv.config(); // Ensure environment variables are loaded

export async function POST(req: Request) {
  try {
    const {
      email,
      address,
      accountType = "Personal account",
    } = await req.json();

    if (!email || !address) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.address = address;
    user.accountType = accountType;
    await user.save();

    return NextResponse.json(
      { message: "User information updated" },
      { status: 200 }
    );
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
