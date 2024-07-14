import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import City from "@/models/City";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, country } = req.body;

    try {
      const city = new City({ name, country });
      await city.save();

      res.status(201).json(city);
    } catch (error) {
      res.status(500).json({ message: "Error adding city", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
