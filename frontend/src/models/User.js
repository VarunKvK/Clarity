import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, default: "Clarity_User" },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  subscriptionLevel: { type: String, required: true, default: 'free' },
  notionIntegrationStatus: { type: Boolean, default: false },
  notionAccessToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
