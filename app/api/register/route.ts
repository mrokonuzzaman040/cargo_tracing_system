import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { contactName, phone, email, password } = req.body;

  if (!contactName || !phone || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    contactName,
    phone,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created", userId: newUser._id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export default handler;
