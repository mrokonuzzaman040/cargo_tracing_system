import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

export async function GET() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.append(
      "Set-Cookie",
      "token=; Path=/; Max-Age=0; HttpOnly"
    );

    return response;
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
