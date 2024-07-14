import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import PickupAddress from "@/models/PickupAddress";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { address } = req.body;

    try {
      const pickupAddress = new PickupAddress({ address });
      await pickupAddress.save();

      res.status(201).json(pickupAddress);
    } catch (error) {
      res.status(500).json({ message: "Error adding pickup address", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
