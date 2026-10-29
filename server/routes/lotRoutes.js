import express from 'express';
import Lot from '../models/Lot.js';

const router = express.Router();

const DEFAULT_LOTS = [
  { code: 'outdoor-1', name: 'ลานจอดกลางแจ้ง 1', type: 'outdoor', total: 100, occupied: 40, pricePerHour: 30, image: '/gangjank1.png' },
  { code: 'outdoor-2', name: 'ลานจอดกลางแจ้ง 2', type: 'outdoor', total: 100, occupied: 35, pricePerHour: 30, image: '/gangjank2.png' },
  { code: 'indoor-1', name: 'อาคารจอดรถ 1', type: 'indoor', total: 120, occupied: 102, pricePerHour: 40, image: '/arkarnjod1.png' },
  { code: 'indoor-2', name: 'อาคารจอดรถ 2', type: 'indoor', total: 150, occupied: 95, pricePerHour: 40, image: '/arkarnjod2.png' },
];

// GET /api/lots
router.get('/', async (req, res) => {
  try {
    let lots = await Lot.find();
    if (lots.length === 0) {
      lots = await Lot.insertMany(DEFAULT_LOTS);
    }
    res.json({ success: true, data: lots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
