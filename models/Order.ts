import mongoose, { Schema, Document } from "mongoose";

interface Goods {
  domesticWb: string;
  natureOfGoods: string;
  itemName: string;
  weight: string;
  declaredValue: string;
  count: string;
  imageUrl: string;
}

interface Order extends Document {
  userId: mongoose.Types.ObjectId;
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
    district: string;
    company: string;
  };
  deliveryMethod: string;
  pickupAddress: string;
  payment: string;
  shippingMethod: string;
  estimatedFee: string;
  orderNumber: string;
  goodsList: Goods[];
  status: string;
  refundCalled: boolean;
}

const GoodsSchema: Schema = new Schema({
  domesticWb: { type: String, required: true },
  natureOfGoods: { type: String, required: true },
  itemName: { type: String, required: true },
  weight: { type: String, required: true },
  declaredValue: { type: String, required: true },
  count: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

const OrderSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
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
      district: { type: String, required: true },
      company: { type: String, required: false },
    },
    deliveryMethod: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    payment: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    estimatedFee: { type: String, required: true },
    orderNumber: { type: String, required: true },
    goodsList: { type: [GoodsSchema], required: true },
    status: { type: String, default: "pending" },
    refundCalled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<Order>("Order", OrderSchema);
