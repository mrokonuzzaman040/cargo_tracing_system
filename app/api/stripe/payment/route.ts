import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { amount, orderId, paymentMethodId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
      });

      if (paymentIntent.status === "succeeded") {
        const order = await Order.findById(orderId);
        if (order) {
          order.paymentStatus = "Paid";
          await order.save();
        }
      }

      res.status(200).json({ paymentIntent });
    } catch (error) {
      console.error("Error processing Stripe payment:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
