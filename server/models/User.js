import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'visitor'], default: 'member' },
    name: { type: String, default: 'ศิวัฒน์ แก้วหนองสังข์' },
    phone: { type: String, required: true },
    employeeId: { type: String, default: '-' },
    avatar: { type: String, default: '/Userbank.jpg' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
