import { NextResponse, NextRequest } from "next/server";
import fetch from "node-fetch";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const form = new FormData();
    form.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMAGEBB_API_KEY}`,
      {
        method: "POST",
        body: form,
      }
    );

    const result: any = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { message: "Image upload failed", error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "File uploaded successfully", imageUrl: result.data.url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
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
