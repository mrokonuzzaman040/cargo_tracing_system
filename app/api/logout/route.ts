import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

export async function GET(req: Request) {
  try {
    // Clear the JWT token cookie
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.append(
      "Set-Cookie",
      "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
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
