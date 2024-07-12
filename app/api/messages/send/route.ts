import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });

    await newMessage.save();

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error); // Log the error for debugging
    return NextResponse.json(
      // @ts-ignore
      { message: "Error sending message", error: error.message },
      { status: 500 }
    );
  }
}
