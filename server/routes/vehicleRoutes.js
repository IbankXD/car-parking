import express from 'express';
import Vehicle from '../models/Vehicle.js';

const router = express.Router();

const DEFAULT_VEHICLES = [
  { plate: 'กก 1234', province: 'กรุงเทพฯ', active: true },
  { plate: 'ขข 5678', province: 'กรุงเทพฯ', active: true },
  { plate: 'สนย 2322', province: 'นนทบุรี', active: false },
];

// GET /api/vehicles
router.get('/', async (req, res) => {
  try {
    let vehicles = await Vehicle.find().sort({ createdAt: -1 });
    if (vehicles.length === 0) {
      vehicles = await Vehicle.insertMany(DEFAULT_VEHICLES);
    }
    res.json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/vehicles
router.post('/', async (req, res) => {
  try {
    const { plate, province = 'กรุงเทพฯ' } = req.body;
    if (!plate) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกทะเบียนรถ' });
    }

    const activeCount = await Vehicle.countDocuments({ active: true });
    const newVehicle = await Vehicle.create({
      plate: plate.trim(),
      province,
      active: activeCount < 2
    });

    res.status(201).json({ success: true, data: newVehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/vehicles/:id/toggle
router.put('/:id/toggle', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'ไม่พบทะเบียนรถ' });
    }

    if (!vehicle.active) {
      const activeCount = await Vehicle.countDocuments({ active: true });
      if (activeCount >= 2) {
        return res.status(400).json({ success: false, message: 'สามารถเปิดใช้งานพร้อมกันได้สูงสุด 2 คัน' });
      }
    }

    vehicle.active = !vehicle.active;
    await vehicle.save();

    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/vehicles/:id
router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'ลบทะเบียนรถเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
