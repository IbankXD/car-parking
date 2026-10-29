import mongoose from 'mongoose';

const parkingSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    receiptNo: { type: String, unique: true, sparse: true },
    plate: { type: String, required: true },
    lotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lot' },
    lotName: { type: String, required: true },
    role: { type: String, enum: ['member', 'visitor'], default: 'member' },
    startTime: { type: Date, default: Date.now },
    exitTime: { type: Date },
    durationHours: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'paid', 'completed'], default: 'active' },
    paidMethod: { type: String },
    paidAt: { type: Date },
    exitPassCode: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('ParkingSession', parkingSessionSchema);
