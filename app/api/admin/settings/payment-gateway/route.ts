import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import PaymentGateway from "@/models/PaymentGateway";
import { validateRole } from "@/lib/validator/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  const roleValidation = await validateRole(req, "admin");
  if (roleValidation) {
    return NextResponse.json(
      { message: roleValidation.message },
      { status: roleValidation.status }
    );
  }

  try {
    const paymentGateways = await PaymentGateway.find();
    return NextResponse.json({ paymentGateways }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching payment gateways", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const roleValidation = await validateRole(req, "admin");
  if (roleValidation) {
    return NextResponse.json(
      { message: roleValidation.message },
      { status: roleValidation.status }
    );
  }

  const { name, details } = await req.json();

  try {
    const paymentGateway = new PaymentGateway({ name, details });
    await paymentGateway.save();
    return NextResponse.json({ paymentGateway }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding payment gateway", error },
      { status: 500 }
    );
  }
}
