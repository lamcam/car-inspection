import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Number, default: 0 },
})

export default mongoose.models.Car || mongoose.model('Car', CarSchema)