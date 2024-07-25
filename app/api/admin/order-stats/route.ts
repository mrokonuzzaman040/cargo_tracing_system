import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import dayjs from "dayjs";
import { validateRole } from "@/lib/validator/auth";

export const dynamic = "force-dynamic"; // Add this line to mark the route as dynamic

export async function GET(req: NextRequest) {
  try {
    const adminValidation = await validateRole(req, "admin");
    if (adminValidation instanceof NextResponse) {
      return adminValidation;
    }

    await dbConnect();

    const startDate = req.nextUrl.searchParams.get("startDate");
    const endDate = req.nextUrl.searchParams.get("endDate");
    const interval = req.nextUrl.searchParams.get("interval");

    if (!startDate || !endDate || !interval) {
      return NextResponse.json(
        { message: "Invalid query parameters" },
        { status: 400 }
      );
    }

    const start = dayjs(startDate).toDate();
    const end = dayjs(endDate).toDate();

    const matchStage = {
      createdAt: {
        $gte: start,
        $lte: end,
      },
    };

    const groupStage = {
      $group: {
        _id: {
          $dateToString: {
            format:
              interval === "day"
                ? "%Y-%m-%d"
                : interval === "week"
                ? "%Y-%U"
                : "%Y-%m",
            date: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    };

    const sortStage = {
      $sort: { _id: 1 },
    };

    const stats = await Order.aggregate([
      { $match: matchStage },
      groupStage,
      // @ts-ignore
      sortStage,
    ]);

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
