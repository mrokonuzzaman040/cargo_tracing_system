import mongoose, { Document, Schema } from "mongoose";

export interface IShippingRate extends Document {
  country: string;
  city: string;
  ratePerKg: number;
}

const ShippingRateSchema: Schema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  ratePerKg: { type: Number, required: true },
});

export default mongoose.models.ShippingRate ||
  mongoose.model<IShippingRate>("ShippingRate", ShippingRateSchema);
