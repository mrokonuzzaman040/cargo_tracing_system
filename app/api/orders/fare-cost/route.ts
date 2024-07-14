// File: pages/api/fare-cost.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import FareCost from "@/models/FareCost";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { country, city, state } = req.query;

  if (!country || !city || !state) {
    return res
      .status(400)
      .json({ message: "Country, city, and state are required" });
  }

  try {
    const fareCost = await FareCost.findOne({ country, city, state });

    if (!fareCost) {
      return res
        .status(404)
        .json({ message: "Fare cost not found for the selected location" });
    }

    return res.status(200).json({ fareCost: fareCost.cost });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching fare cost", error });
  }
}
