import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import PaymentGateway from "@/models/PaymentGateway";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { gateway } = req.body;

    try {
      const paymentGateway = new PaymentGateway({ gateway });
      await paymentGateway.save();

      res.status(201).json(paymentGateway);
    } catch (error) {
      res.status(500).json({ message: "Error adding payment gateway", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
