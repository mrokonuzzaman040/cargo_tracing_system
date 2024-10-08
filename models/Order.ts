import mongoose, { Document, Model, Schema } from "mongoose";

interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  sender: {
    name: string;
    phonePrefix: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    phonePrefix: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    district?: string;
    company?: string;
  };
  deliveryMethod: string;
  pickupAddress: string;
  payment: string;
  shippingMethod: string;
  estimatedFee?: string;
  status: string;
  orderNumber: string;
  goodsList: {
    domesticWb: string;
    natureOfGoods: string;
    itemName: string;
    weight: string;
    declaredValue: string;
    count: string;
    imageUrl: string;
  }[];
  createdAt: Date;
  refundCalled: boolean; 
  paymentStatus: string;
}

const OrderSchema: Schema = new Schema({
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
  deliveryMethod: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  payment: { type: String, required: true },
  shippingMethod: { type: String, required: true },
  estimatedFee: { type: String },
  status: { type: String, default: "pending" },
  orderNumber: { type: String, required: true },
  goodsList: [
    {
      domesticWb: { type: String, required: true },
      natureOfGoods: { type: String, required: true },
      itemName: { type: String, required: true },
      weight: { type: String, required: true },
      declaredValue: { type: String, required: true },
      count: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  refundCalled: { type: Boolean, default: false },
  paymentStatus: { type: String, default: "Pending" },
});

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
