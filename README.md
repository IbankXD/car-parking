# 🚗 Find Parking - Smart Car Parking System (Full-Stack)

เว็บแอปพลิเคชันระบบบริหารจัดการที่จอดรถอัจฉริยะแบบครบวงจร (Full-Stack Web Application) ที่ทำงานร่วมกันระหว่าง **React (Vite)**, **Node.js (Express)** และฐานข้อมูล **MongoDB**

---

## 🌟 ฟีเจอร์หลัก (Key Features)

1. **ระบบยืนยันตัวตนและการจัดการสิทธิ์ (Authentication & Roles):**
   - **MEMBER (สมาชิก/พนักงาน):** สิทธิพิเศษจอดฟรี 2 ชั่วโมงแรก ชั่วโมงถัดไป 20 บาท/ชม.
   - **VISITOR (ผู้มาติดต่อ):** เข้าใช้งานด่วนด้วย LINE หรือสมัครสมาชิก อัตราปกติ 30 บาท/ชม.
   - ปลอดภัยด้วยการเข้ารหัสผ่าน (bcryptjs) และ JWT Token

2. **ระบบค้นหาและตรวจสอบลานจอด (Find Park & Slot Monitoring):**
   - ตรวจสอบจำนวนช่องจอดว่างแบบสด (Real-time availability) ทั้งในอาคารและกลางแจ้ง
   - ระบบแนะนำจุดจอดตามสภาพอากาศ (เช่น พายุฝนฟ้าคะนอง แนะนำให้จอดในอาคาร)
   - ระบบนำทางจำลอง (Simulated GPS Navigation) ไปยังไม้กั้นทางเข้า

3. **ระบบการเข้าจอดและตัวจับเวลาสด (Live Parking Timer & Digital Pass):**
   - ตัวจับเวลาดิจิทัลนับเวลาจริงตามชั่วโมง นาที และวินาที
   - คำนวณค่าบริการตามเวลาจอดและหักส่วนลดสิทธิ์อัตโนมัติ
   - แสดงบัตรจอดรถดิจิทัล (Digital QR Pass) สำหรับสแกนเข้า-ออก

4. **ระบบชำระเงินและใบเสร็จ (Payment & Digital Receipt):**
   - สรุปรายละเอียดบิลอย่างละเอียด (เวลาเข้า-ออก, ระยะเวลา, สิทธิ์ส่วนลด, ยอดสุทธิ)
   - รองรับการชำระเงินผ่าน QR PromptPay และ TrueMoney Wallet
   - ออกบัตรผ่านสำหรับเปิดไม้กั้นทางออกหลังชำระเงินเสร็จสิ้น

5. **ระบบจองที่จอดล่วงหน้า (Advance Booking):**
   - จองที่จอดรถล่วงหน้าตามวัน เวลา และสถานที่ พร้อมออกตั๋ว QR Code

6. **ระบบจัดการยานพาหนะ (Vehicle Management):**
   - เพิ่ม-ลบ ทะเบียนรถ และเลือกเปิดใช้งานพร้อมกันได้สูงสุด 2 คัน

7. **ประวัติการใช้งาน (History & Receipts):**
   - บันทึกประวัติการเข้าจอดย้อนหลังทั้งหมด พร้อมดูและดาวน์โหลดใบเสร็จ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:**
  - React 18
  - Vite
  - React Router DOM v7
  - Bootstrap 5 & Bootstrap Icons
  - Fontsource Inter
  - Context API & Custom Mobile-First CSS System
- **Backend (`server/`):**
  - Node.js & Express.js
  - MongoDB & Mongoose
  - JSON Web Token (JWT) & bcryptjs
  - CORS & Dotenv

---

## 🚀 วิธีการติดตั้งและเริ่มใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
# ติดตั้ง Frontend
npm install

# ติดตั้ง Backend
cd server
npm install
cd ..
```

### 2. รันระบบ (Development Mode)

**รัน Backend (Node.js + MongoDB API):**
```bash
node server/index.js
# Backend จะรันที่ http://localhost:5000
```

**รัน Frontend (React + Vite):**
```bash
npm run dev
# Frontend จะรันที่ http://localhost:5173
```

---

## ⚡ บัญชีทดลองใช้งาน (Demo Accounts)
- **Member:** `username: member` | `password: 1234`
- **Visitor:** `username: visitor` | `password: 1234`
- หรือกดปุ่ม **"เข้าใช้งานด่วนด้วย LINE (Visitor)"** ที่หน้า Login ได้ทันที
