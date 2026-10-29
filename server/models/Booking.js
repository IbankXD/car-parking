import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    plate: { type: String, required: true },
    lotName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
