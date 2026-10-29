import mongoose from 'mongoose';

const lotSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['indoor', 'outdoor'], required: true },
    total: { type: Number, required: true, default: 100 },
    occupied: { type: Number, required: true, default: 0 },
    pricePerHour: { type: Number, required: true, default: 30 },
    image: { type: String, default: '/gangjank1.png' }
  },
  { timestamps: true }
);

export default mongoose.model('Lot', lotSchema);
