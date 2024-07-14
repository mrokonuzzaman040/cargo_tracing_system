import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Country from "@/models/Country";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name } = req.body;

    try {
      const country = new Country({ name });
      await country.save();

      res.status(201).json(country);
    } catch (error) {
      res.status(500).json({ message: "Error adding country", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
