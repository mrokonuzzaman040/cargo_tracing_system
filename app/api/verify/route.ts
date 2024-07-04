import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
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

    if (user.verificationCode !== code) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();
    
    return NextResponse.json({ message: "User verified" }, { status: 200 });
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
