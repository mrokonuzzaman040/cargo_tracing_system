import { NextResponse, NextRequest } from "next/server";
import dotenv from "dotenv";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { jwtVerify } from "jose";
import User from "@/models/User";
import nodemailer from "nodemailer";
import { logo } from "@/var";

dotenv.config(); // Ensure environment variables are loaded

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your_secret"
);

// Function to generate a unique 8-digit alphanumeric order number
const generateOrderNumber = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderNumber = "";
  for (let i = 0; i < 8; i++) {
    orderNumber += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderNumber;
};

// Function to generate the email content
const generateEmailContent = (orderNumber: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 10px 0;
        }
        .header img {
          max-width: 100px;
        }
        .content {
          padding: 20px;
        }
        .content h1 {
          color: #333333;
        }
        .content p {
          color: #555555;
        }
        .tracking-number {
          display: inline-block;
          margin: 20px 0;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          font-weight: bold;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 10px 0;
          color: #777777;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src=${logo} alt="Company Logo">
        </div>
        <div class="content">
          <h1>Thank you for your order!</h1>
          <p>Dear Customer,</p>
          <p>We have received your order and it is currently being processed. Your tracking number is:</p>
          <div class="tracking-number">${orderNumber}</div>
          <p>Please keep this number for your records. You can use it to track the status of your order on our website.</p>
          <p>Thank you for shopping with us!</p>
          <p>Best regards,<br>Your Company Name</p>
        </div>
        <div class="footer">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Function to send an email
const sendOrderEmail = async (email: string, orderNumber: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  const emailContent = generateEmailContent(orderNumber);

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Order Confirmation",
    html: emailContent,
  });

  console.log("Message sent: %s", info.messageId);
};

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (!payload || typeof payload !== "object" || !payload.email) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    const email = payload.email as string;

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const {
      senderName,
      senderPhonePrefix,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhonePrefix,
      receiverPhone,
      country,
      city,
      street,
      district,
      company,
      deliveryMethod,
      pickupAddress,
      payment,
      shippingMethod,
      estimatedFee,
      goodsList,
    } = await req.json();

    const orderNumber = generateOrderNumber();

    const order = new Order({
      userId: user._id,
      sender: {
        name: senderName,
        phonePrefix: senderPhonePrefix,
        phone: senderPhone,
        address: senderAddress,
      },
      receiver: {
        name: receiverName,
        phonePrefix: receiverPhonePrefix,
        phone: receiverPhone,
        country,
        city,
        street,
        district,
        company,
      },
      deliveryMethod,
      pickupAddress,
      payment,
      shippingMethod,
      estimatedFee,
      goodsList, // Ensure goodsList is included here
      orderNumber: orderNumber,
    });

    await order.save();

    // Send an email to the user with the tracking number
    await sendOrderEmail(email, orderNumber);

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
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
