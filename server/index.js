import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import lotRoutes from './routes/lotRoutes.js';
import parkingRoutes from './routes/parkingRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import authRoutes, { seedDefaultUsers } from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  seedDefaultUsers();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Smart Car Parking API', time: new Date() });
});

// Root
app.get('/', (req, res) => {
  res.send('🚗 Smart Car Parking API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Smart Car Parking Backend is running on http://localhost:${PORT}`);
});
