import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import City from "@/models/City";

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const handler: HandlerType = async (req, res) => {
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
};

export default handler;
