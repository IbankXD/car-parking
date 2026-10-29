import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/car_parking');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`⚠️ โปรดตรวจสอบว่า MongoDB Server (mongod หรือ MongoDB Compass / Atlas) กำลังทำงานอยู่`);
  }
};
