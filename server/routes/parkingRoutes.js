import express from 'express';
import ParkingSession from '../models/ParkingSession.js';
import Lot from '../models/Lot.js';

const router = express.Router();

// Helper: Calculate parking fee based on role and elapsed time
const calculateFee = (startTime, role = 'member', ratePerHour = 30) => {
  const diffMs = Math.max(1000, Date.now() - new Date(startTime).getTime());
  const elapsedMinutes = Math.floor(diffMs / (1000 * 60));
  const elapsedHours = elapsedMinutes / 60;

  const freeHours = role === 'member' ? 2 : 0;
  const effectiveRate = role === 'member' ? 20 : ratePerHour;
  const billableHours = Math.max(0, Math.ceil(elapsedHours - freeHours));

  return {
    elapsedMinutes,
    elapsedHours: Number(elapsedHours.toFixed(2)),
    billableHours,
    fee: billableHours * effectiveRate
  };
};

// GET /api/parking/active
router.get('/active', async (req, res) => {
  try {
    const session = await ParkingSession.findOne({
      status: { $in: ['active', 'paid'] }
    }).sort({ createdAt: -1 });

    if (!session) {
      return res.json({ success: true, session: null });
    }

    const feeCalculation = calculateFee(session.startTime, session.role);

    res.json({
      success: true,
      session: {
        ...session.toObject(),
        currentFee: session.status === 'paid' ? session.fee : feeCalculation.fee,
        elapsedMinutes: feeCalculation.elapsedMinutes,
        elapsedHours: feeCalculation.elapsedHours
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/parking/checkin
router.post('/checkin', async (req, res) => {
  try {
    const { plate, lotId, role = 'member' } = req.body;

    // Check if there is already an active session for this plate
    const existing = await ParkingSession.findOne({
      plate,
      status: { $in: ['active', 'paid'] }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `รถทะเบียน ${plate} กำลังเข้าจอดอยู่ที่ ${existing.lotName} แล้ว`
      });
    }

    let lot = null;
    if (lotId) {
      lot = await Lot.findById(lotId).catch(() => null);
    }
    if (!lot) {
      lot = await Lot.findOne();
    }

    const sessionId = 'SES-' + Date.now().toString().slice(-6);

    const newSession = await ParkingSession.create({
      sessionId,
      plate,
      lotId: lot ? lot._id : null,
      lotName: lot ? lot.name : 'ลานจอดกลางแจ้ง 1',
      role,
      startTime: new Date(),
      status: 'active'
    });

    // Increment occupied in lot
    if (lot) {
      await Lot.findByIdAndUpdate(lot._id, { $inc: { occupied: 1 } });
    }

    res.status(201).json({
      success: true,
      message: 'บันทึกเวลาเข้าจอดเรียบร้อยแล้ว',
      session: newSession
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/parking/pay
router.post('/pay', async (req, res) => {
  try {
    const { sessionId, paymentMethod = 'PromptPay' } = req.body;

    const session = await ParkingSession.findOne({ sessionId, status: 'active' });
    if (!session) {
      return res.status(404).json({ success: false, message: 'ไม่พบรายการเข้าจอดที่ต้องชำระเงิน' });
    }

    const { fee, elapsedHours } = calculateFee(session.startTime, session.role);
    const exitCode = 'EXIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const receiptNo = 'REC-' + Math.floor(10000 + Math.random() * 90000);

    session.status = 'paid';
    session.fee = fee;
    session.durationHours = elapsedHours;
    session.paidMethod = paymentMethod;
    session.paidAt = new Date();
    session.exitPassCode = exitCode;
    session.receiptNo = receiptNo;

    await session.save();

    res.json({
      success: true,
      message: 'ชำระเงินสำเร็จแล้ว',
      session
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/parking/checkout
router.post('/checkout', async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await ParkingSession.findOne({
      sessionId,
      status: { $in: ['active', 'paid'] }
    });

    if (!session) {
      return res.status(404).json({ success: false, message: 'ไม่พบรายการเข้าจอด' });
    }

    const exitTime = new Date();
    const diffHours = ((exitTime.getTime() - new Date(session.startTime).getTime()) / (1000 * 3600)).toFixed(2);

    session.status = 'completed';
    session.exitTime = exitTime;
    session.durationHours = Number(diffHours);
    if (!session.receiptNo) {
      session.receiptNo = 'REC-' + Math.floor(10000 + Math.random() * 90000);
    }

    await session.save();

    // Decrement lot occupied
    if (session.lotId) {
      await Lot.findByIdAndUpdate(session.lotId, {
        $inc: { occupied: -1 }
      });
    }

    res.json({
      success: true,
      message: 'สแกนออกจากลานจอดเรียบร้อย ไม้กั้นเปิดแล้ว',
      session
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
