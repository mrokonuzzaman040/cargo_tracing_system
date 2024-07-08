import mongoose from "mongoose";

// User schema definition
const UserSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String }, // Remove the required constraint here
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  failedPasswordAttempts: { type: Number, default: 0 },
  isAccountLocked: { type: Boolean, default: false },
  accountType: { type: String, default: "Personal account" }, // New field
  address: { type: String }, // New field
  token: { type: String }, // New field
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
