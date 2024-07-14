import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ShippingMethod from "@/models/ShippingMethod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { method } = req.body;

    try {
      const shippingMethod = new ShippingMethod({ method });
      await shippingMethod.save();

      res.status(201).json(shippingMethod);
    } catch (error) {
      res.status(500).json({ message: "Error adding shipping method", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
