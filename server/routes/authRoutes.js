import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'car_parking_secret_2026';

// Helper to sign JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Seed default users if they don't exist
export const seedDefaultUsers = async () => {
  try {
    const memberCount = await User.countDocuments({ username: 'member' });
    if (memberCount === 0) {
      const hashedPass = await bcrypt.hash('1234', 10);
      await User.create({
        username: 'member',
        password: hashedPass,
        role: 'member',
        name: 'ศิวัฒน์ แก้วหนองสังข์',
        phone: '096-728-2172',
        employeeId: 'MET-8942',
        avatar: '/Userbank.jpg'
      });
      console.log('👤 Seeded demo user: member / 1234');
    }

    const visitorCount = await User.countDocuments({ username: 'visitor' });
    if (visitorCount === 0) {
      const hashedPass = await bcrypt.hash('1234', 10);
      await User.create({
        username: 'visitor',
        password: hashedPass,
        role: 'visitor',
        name: 'สมชาย รักการจอด (Visitor)',
        phone: '095-882-9932',
        employeeId: '-',
        avatar: '/User.jpg'
      });
      console.log('👤 Seeded demo user: visitor / 1234');
    }
  } catch (err) {
    console.warn('User seed warning:', err.message);
  }
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, role = 'visitor', phone, employeeId, name } = req.body;

    if (!username || !password || !phone) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้ รหัสผ่าน และเบอร์โทรศัพท์' });
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร' });
    }

    const existingUser = await User.findOne({ username: username.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username.toLowerCase().trim(),
      password: hashedPassword,
      role: role === 'member' ? 'member' : 'visitor',
      name: name?.trim() || username.trim(),
      phone: phone.trim(),
      employeeId: role === 'member' ? (employeeId || 'EMP-' + Math.floor(1000 + Math.random() * 9000)) : '-',
      avatar: role === 'member' ? '/Userbank.jpg' : '/User.jpg'
    });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'สมัครสมาชิกสำเร็จ',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        name: newUser.name,
        phone: newUser.phone,
        employeeId: newUser.employeeId,
        avatar: newUser.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
    }

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        phone: user.phone,
        employeeId: user.employeeId,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/line-login (One-click LINE Visitor login)
router.post('/line-login', async (req, res) => {
  try {
    let lineUser = await User.findOne({ username: 'line_visitor' });
    if (!lineUser) {
      const hashedPass = await bcrypt.hash('line_login_guest', 10);
      lineUser = await User.create({
        username: 'line_visitor',
        password: hashedPass,
        role: 'visitor',
        name: 'LINE Guest User',
        phone: '095-xxx-xx32',
        employeeId: '-',
        avatar: '/User.jpg'
      });
    }

    const token = generateToken(lineUser);

    res.json({
      success: true,
      message: 'เข้าสู่ระบบผ่าน LINE สำเร็จ',
      token,
      user: {
        id: lineUser._id,
        username: lineUser.username,
        role: lineUser.role,
        name: lineUser.name,
        phone: lineUser.phone,
        employeeId: lineUser.employeeId,
        avatar: lineUser.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me (Verify token)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง (No Token)' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'ไม่พบผู้ใช้ในระบบ' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
  }
});

export default router;
