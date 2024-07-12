import { NextResponse, NextRequest } from "next/server";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const uploadMiddleware = promisify(upload.single("image"));

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const res: any = { req, res: undefined };
    await uploadMiddleware(res.req, res.res);

    if (!res.req.file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "File uploaded successfully", file: res.req.file },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      // @ts-ignore
      { message: "Error uploading file", error: error.message },
      { status: 500 }
    );
  }
}
