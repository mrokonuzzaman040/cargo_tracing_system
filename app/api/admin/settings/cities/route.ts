import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import City from "@/models/City";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { country } = req.query;

    try {
      const cities = await City.find({ country });
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cities", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
