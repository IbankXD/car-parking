import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate();
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.carNumber || !formData.notes || !formData.time || !formData.date) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('parking_appointments') || '[]');
    const newAppointment = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString('th-TH'),
      location: 'ลานจอดกลางแจ้ง 1'
    };
    localStorage.setItem('parking_appointments', JSON.stringify([newAppointment, ...existing]));

    alert('ข้อมูลถูกบันทึกแล้ว!');

    navigate('/history', { state: { appointmentData: formData } });

    setFormData({
      name: '',
      phone: '',
      carNumber: '',
      notes: '',
      time: '',
      date: '',
    });
  };

  const goToHistory = () => {
    navigate('/history');
  };

  return (
    <div className="booking-container">
      <div className="wallpaper8">
        <div className="form-header">
          <img className="logo-img" src="/logo.png" alt="Logo" />
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
            <img className='icons' src="/homes.png" alt="Home" />
          </button>
          <button className="nav-button" onClick={() => navigate('/findpark')}>
            <img className='icons' src="/search.png" alt="Find" />
          </button>
          <button className="nav-button active" onClick={() => navigate('/parking')}>
            <img className='scan' src="/scan.png" alt="Scan" />
          </button>
          <button className="nav-button" onClick={() => navigate('/recent')}>
            <img className='icons' src="/recent.png" alt="Recent" />
          </button>
          <button className="nav-button" onClick={() => navigate('/visualp')}>
            <img className='icons' src="/userpro.png" alt="Profile" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
