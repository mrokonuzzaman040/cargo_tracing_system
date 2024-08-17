import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
});

const AccountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  profit: {
    type: Number,
    required: true,
    default: 0,
  },
  loss: {
    type: Number,
    required: true,
    default: 0,
  },
  payments: [PaymentSchema],
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
