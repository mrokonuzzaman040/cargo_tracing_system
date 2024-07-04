import mongoose from "mongoose";

// User schema definition
const UserSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String }, // Remove the required constraint here
  isVerified: { type: Boolean, default: false },
});

// Pre-save middleware to enforce verificationCode requirement on creation
UserSchema.pre("save", function (next) {
  if (!this.isVerified && !this.verificationCode) {
    return next(new Error("verificationCode is required"));
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
