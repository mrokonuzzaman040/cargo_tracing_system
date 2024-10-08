import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config(); // Ensure environment variables are loaded

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Create a transporter for sending emails
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

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      // text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
      // Please click on the following link, or paste this into your browser to complete the process:\n\n
      // ${resetUrl}\n\n
      // If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      html: `
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
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
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin: 20px 0;
                  background-color: #007BFF;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Reset Your Password</h1>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>We received a request to reset your password. Click the button below to reset it:</p>
                  <a href="${resetUrl}" class="button">Reset Password</a>
                  <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
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
      { message: "Password reset email sent" },
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
