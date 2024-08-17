import mongoose, { Document, Model, Schema } from "mongoose";

interface IShippingMethod extends Document {
  method: string;
}

const ShippingMethodSchema: Schema = new Schema({
  method: { type: String, required: true },
});

const ShippingMethod: Model<IShippingMethod> =
  mongoose.models.ShippingMethod ||
  mongoose.model("ShippingMethod", ShippingMethodSchema);

export default ShippingMethod;
