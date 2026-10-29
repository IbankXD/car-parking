import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true },
    province: { type: String, default: 'กรุงเทพฯ' },
    active: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Vehicle', vehicleSchema);
