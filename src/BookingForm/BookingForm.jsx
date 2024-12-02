import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate();  // สร้าง instance ของ useNavigate
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carNumber: '',
    notes: '',
    time: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตรวจสอบว่าทุกฟิลด์ถูกกรอกครบถ้วน
    if (!formData.name || !formData.phone || !formData.carNumber || !formData.notes || !formData.time || !formData.date) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return; // ถ้ายังไม่ครบให้ไม่ส่งข้อมูล
    }

    console.log('Form Data:', formData);
    alert('ข้อมูลถูกบันทึกแล้ว!');

    // ส่งข้อมูลไปที่หน้า AppointmentHistory
    navigate('/history', { state: { appointmentData: formData } });

    // Reset ฟอร์ม
    setFormData({
      name: '',
      phone: '',
      carNumber: '',
      notes: '',
      time: '',
      date: '',
    });
  };

  // ฟังก์ชันสำหรับปุ่ม "ประวัติการนัดหมาย"
  const goToHistory = () => {
    navigate('/history');
  };

  return (
    <div className="booking-container">
    
      <div className="wallpaper8">
        <div className="form-header">
          <img className="logo-img" src="logo.png" alt="" />
        </div>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <h2>จองการนัดหมาย</h2>
          <input
            type="text"
            name="name"
            placeholder="ชื่อ - นามสกุล"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="เบอร์โทรศัพท์"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="carNumber"
            placeholder="ทะเบียนรถ"
            className="form-input"
            value={formData.carNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="notes"
            placeholder="หมายเหตุ"
            className="form-input"
            value={formData.notes}
            onChange={handleChange}
          />
          <div className="input-container">
            <input
              type="time"
              name="time"
              className="form-input"
              value={formData.time}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
   
          <button type="submit" className="submit-button">ยืนยันการลงทะเบียน</button>
          <br />
          <button type="button" className="history-button" onClick={goToHistory}>ประวัติการนัดหมาย</button>
        </form>
        <div className="navbar">
                <button className="nav-button" onClick={() => navigate('/dashboard')}>
                    <img className='icons' src="homes.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/findpark')}>
                    <img className='icons' src="search.png" alt="" />
                </button>
                <button className="nav-button active">
                    <img className='scan' src="scan.png" alt="" />
                </button>
                <button className="nav-button">
                    <img className='icons' src="recent.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/visualp')}>
                    <img className='icons' src="userpro.png" alt="" />

                </button>
            </div>
      </div>


    </div>

  );
};

export default BookingForm;
