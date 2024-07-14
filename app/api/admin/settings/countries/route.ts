import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Country from "@/models/Country";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const countries = await Country.find();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching countries", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
