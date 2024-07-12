import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  const userId = req.nextUrl.pathname.split("/").pop();

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { message: "Invalid user ID format" },
      { status: 400 }
    );
  }

  try {
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error); // Log the error for debugging
    return NextResponse.json(
      // @ts-ignore - error.message is not a valid property
      { message: "Error fetching messages", error: error.message },
      { status: 500 }
    );
  }
}
