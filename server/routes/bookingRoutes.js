import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { name, phone, plate, lotName, date, time, notes } = req.body;
    if (!name || !phone || !plate || !lotName || !date || !time) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const booking = await Booking.create({
      name,
      phone,
      plate,
      lotName,
      date,
      time,
      notes: notes || ''
    });

    res.status(201).json({ success: true, message: 'จองที่จอดรถล่วงหน้าสำเร็จ', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'ยกเลิกการนัดหมายเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
