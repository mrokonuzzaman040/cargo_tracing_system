import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { siteTitle, siteDescription } = req.body;

    try {
      const settings = await SiteSettings.findOneAndUpdate(
        {},
        { siteTitle, siteDescription },
        { new: true, upsert: true }
      );

      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error saving site settings", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
