import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';

export default function BookingPage() {
  const { user, lots, vehicles, bookings, addBooking } = useParking();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    plate: vehicles[0]?.plate || 'กก 1234',
    lotName: lots[0]?.name || 'อาคารจอดรถ 1',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.plate || !formData.date || !formData.time) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    addBooking(formData);
    setIsSuccess(true);
  };

  return (
    <MobileLayout>
      <div className="page-booking">
        <h2 className="page-heading mb-1">จองที่จอดรถล่วงหน้า</h2>
        <p className="text-muted small mb-4">สำรองช่องจอดสำหรับบุคคลหรือการนัดหมายสำคัญ</p>

        {isSuccess ? (
          <div className="card p-4 text-center border-0 shadow-sm rounded-4 mb-4">
            <div className="text-success fs-1 mb-2">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3 className="fs-5 fw-bold text-success mb-2">การจองสำเร็จแล้ว!</h3>
            <p className="text-muted small mb-3">
              ระบบได้บันทึกการสำรองที่จอดรถของคุณเรียบร้อยแล้ว
            </p>

            <div className="bg-light p-3 rounded-4 text-start small mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">สถานที่</span>
                <span className="fw-bold">{formData.lotName}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">วันที่ & เวลา</span>
                <span className="fw-bold">{formData.date} {formData.time} น.</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">ทะเบียนรถ</span>
                <span className="fw-bold">{formData.plate}</span>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary flex-grow-1 rounded-pill"
                onClick={() => setIsSuccess(false)}
              >
                จองเพิ่มอีก
              </button>
              <button
                className="btn btn-outline-secondary flex-grow-1 rounded-pill"
                onClick={() => navigate('/dashboard')}
              >
                หน้าหลัก
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-3 border-0 shadow-sm rounded-4 mb-4">
            <div className="mb-3">
              <label className="form-label small fw-bold">ชื่อ - นามสกุล ผู้จอง</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">เบอร์โทรศัพท์ติดต่อ</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">ทะเบียนรถ</label>
              <input
                type="text"
                name="plate"
                className="form-control"
                placeholder="เช่น กก 1234"
                value={formData.plate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">เลือกลานจอด / อาคาร</label>
              <select
                name="lotName"
                className="form-select"
                value={formData.lotName}
                onChange={handleChange}
              >
                {lots.map((lot) => (
                  <option key={lot.id} value={lot.name}>
                    {lot.name} ({lot.type === 'indoor' ? 'ในอาคาร' : 'กลางแจ้ง'})
                  </option>
                ))}
              </select>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label small fw-bold">วันที่นัดหมาย</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">เวลาที่เข้าจอด</label>
                <input
                  type="time"
                  name="time"
                  className="form-control"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold">หมายเหตุ / จุดประสงค์</label>
              <input
                type="text"
                name="notes"
                className="form-control"
                placeholder="เช่น พบลูกค้า, สัมภาษณ์งาน"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill fw-bold">
              <i className="bi bi-calendar-check me-1"></i> ยืนยันการจองที่จอดรถ
            </button>
          </form>
        )}

        {/* Existing Bookings List */}
        <section className="existing-bookings mb-4">
          <h4 className="fs-6 fw-bold mb-3">
            <i className="bi bi-list-check text-primary me-2"></i>รายการจองของคุณ ({bookings.length})
          </h4>
          {bookings.length === 0 ? (
            <p className="text-muted small text-center py-3 bg-light rounded-3">
              ยังไม่มีประวัติการจองล่วงหน้า
            </p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="card p-3 border-0 shadow-sm rounded-4 mb-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fs-6 fw-bold mb-1">{b.lotName}</h5>
                    <p className="small text-muted mb-1">
                      <i className="bi bi-calendar-event me-1"></i>
                      {b.date} • {b.time} น.
                    </p>
                    <span className="badge bg-light text-dark border">
                      ทะเบียน: {b.plate}
                    </span>
                  </div>
                  <img src="/QRCODESC.png" alt="Pass QR" style={{ width: '50px', height: '50px' }} />
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </MobileLayout>
  );
}
