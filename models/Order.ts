import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    name: { type: String, required: true },
    phonePrefix: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  receiver: {
    name: { type: String, required: true },
    phonePrefix: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    district: { type: String },
    company: { type: String },
  },
  cargo: [
    {
      itemName: { type: String, required: true },
      weight: { type: Number, required: true },
      declaredValue: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
  deliveryMethod: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  payment: { type: String, required: true },
  shippingMethod: { type: String, required: true },
  estimatedFee: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
