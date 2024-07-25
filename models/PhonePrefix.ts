import mongoose from "mongoose";

const PhonePrefixSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.models.PhonePrefix ||
  mongoose.model("PhonePrefix", PhonePrefixSchema);
