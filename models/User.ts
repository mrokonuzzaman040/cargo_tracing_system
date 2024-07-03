import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
