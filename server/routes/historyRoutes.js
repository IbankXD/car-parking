import express from 'express';
import ParkingSession from '../models/ParkingSession.js';

const router = express.Router();

// GET /api/history
router.get('/', async (req, res) => {
  try {
    const history = await ParkingSession.find({ status: 'completed' }).sort({ exitTime: -1 });
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/history/receipt/:receiptNo
router.get('/receipt/:receiptNo', async (req, res) => {
  try {
    const session = await ParkingSession.findOne({ receiptNo: req.params.receiptNo });
    if (!session) {
      return res.status(404).json({ success: false, message: 'ไม่พบใบเสร็จนี้' });
    }
    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
