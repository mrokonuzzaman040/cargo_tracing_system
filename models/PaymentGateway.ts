import mongoose, { Document, Model, Schema } from "mongoose";

interface IPaymentGateway extends Document {
  gateway: string;
}

const PaymentGatewaySchema: Schema = new Schema({
  gateway: { type: String, required: true },
});

const PaymentGateway: Model<IPaymentGateway> =
  mongoose.models.PaymentGateway ||
  mongoose.model("PaymentGateway", PaymentGatewaySchema);

export default PaymentGateway;
