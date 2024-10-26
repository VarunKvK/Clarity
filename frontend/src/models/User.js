import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image:{type:String,required:true},
  subscriptionLevel: { type: String, required: true, default: 'free' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)