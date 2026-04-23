import mongoose, { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    reference: {
      type: String,
      required: [true, "Reference number is required"],
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    screenshot: {
      type: String, // Base64 string
      required: [true, "Screenshot is required"],
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
