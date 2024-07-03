import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

export async function POST(req: Request) {
  const { contactName, phone, email, password } = await req.json();

  if (!contactName || !phone || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

  const newUser = new User({
    contactName,
    phone,
    email,
    password: hashedPassword,
    verificationCode,
    isVerified: false,
  });

  try {
    await newUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'User created', userId: newUser._id }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user or sending email:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
