import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Payment from "@/lib/models/Payment";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, phone, reference, courseName, amount, screenshot } = body;

    if (!name || !phone || !reference || !courseName || !amount || !screenshot) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newPayment = await Payment.create({
      name,
      phone,
      reference,
      courseName,
      amount,
      screenshot,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Payment submitted successfully", id: newPayment._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Payment Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit payment. Please try again." },
      { status: 500 }
    );
  }
}
