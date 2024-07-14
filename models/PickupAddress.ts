import mongoose, { Document, Model, Schema } from "mongoose";

interface IPickupAddress extends Document {
  address: string;
}

const PickupAddressSchema: Schema = new Schema({
  address: { type: String, required: true },
});

const PickupAddress: Model<IPickupAddress> =
  mongoose.models.PickupAddress ||
  mongoose.model("PickupAddress", PickupAddressSchema);

export default PickupAddress;
