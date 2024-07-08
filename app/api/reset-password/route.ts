import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Ensure environment variables are loaded

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token has not expired
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Send warning email
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT
        ? parseInt(process.env.EMAIL_PORT, 10)
        : undefined,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Changed Successfully",
      html: `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin: 20px auto;
                    max-width: 600px;
                }
                .header {
                    background-color: #007BFF;
                    padding: 20px;
                    text-align: center;
                    color: #ffffff;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    background-color: #f1f1f1;
                    padding: 10px;
                    text-align: center;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Changed Successfully</h1>
                </div>
                <div class="content">
                    <p>Hello ${user.contactName},</p>
                    <p>Your password was successfully changed.</p>
                    <p>If you did not perform this action, please contact our support team immediately.</p>
                    <p>Details:</p>
                    <ul>
                        <li>Email: ${user.email}</li>
                        <li>Date and Time: ${new Date().toLocaleString()}</li>
                    </ul>
                    <p>Thank you,<br>Your Company Name</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset successfully" },
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
