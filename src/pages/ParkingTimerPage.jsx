import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';
import { asset } from '../utils/asset';

export default function ParkingTimerPage() {
  const {
    activeSession,
    user,
    lots,
    vehicles,
    startParking,
    calculateCurrentFee,
    checkoutAndLeave
  } = useParking();

  const navigate = useNavigate();

  // Selected for new session
  const [selectedLotId, setSelectedLotId] = useState(lots[0]?.id || 'outdoor-1');
  const [selectedPlate, setSelectedPlate] = useState(vehicles[0]?.plate || 'กก 1234');

  // Timer state
  const [timerDisplay, setTimerDisplay] = useState({ hrs: '00', mins: '00', secs: '00', totalSeconds: 0 });
  const [currentFee, setCurrentFee] = useState(0);

  useEffect(() => {
    if (!activeSession) return;

    const interval = setInterval(() => {
      const diffMs = Math.max(0, Date.now() - activeSession.startTime);
      const totalSec = Math.floor(diffMs / 1000);
      const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const s = String(totalSec % 60).padStart(2, '0');

      setTimerDisplay({ hrs: h, mins: m, secs: s, totalSeconds: totalSec });
      setCurrentFee(calculateCurrentFee(activeSession));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, calculateCurrentFee]);

  const handleStartParking = (e) => {
    e.preventDefault();
    startParking(selectedLotId, selectedPlate);
  };

  const handleLeave = () => {
    if (!activeSession.paid && currentFee > 0) {
      alert('กรุณาชำระค่าบริการก่อนทำการสแกนออกจากลานจอดครับ');
      navigate('/payment');
      return;
    }
    const ok = window.confirm('ยืนยันการสแกน QR Code เพื่อเปิดไม้กั้นออกจากลานจอดรถ?');
    if (ok) {
      checkoutAndLeave();
      alert('ออกจากลานจอดรถเรียบร้อย ไม้กั้นเปิดแล้ว ขอให้เดินทางโดยสวัสดิภาพครับ!');
      navigate('/history');
    }
  };

  return (
    <MobileLayout>
      <div className="page-parking-timer">
        {!activeSession ? (
          /* Start New Session Form */
          <div className="start-session-box">
            <div className="text-center mb-4">
              <div className="icon-circle bg-primary-subtle text-primary mb-2 mx-auto">
                <i className="bi bi-car-front-fill fs-2"></i>
              </div>
              <h2 className="fs-5 fw-bold mb-1">บันทึกการเข้าจอดรถ</h2>
              <p className="text-muted small">เลือกจุดจอดและทะเบียนรถเพื่อเริ่มจับเวลาเข้าจอด</p>
            </div>

            <form onSubmit={handleStartParking} className="card p-3 shadow-sm border-0 rounded-4">
              <div className="mb-3">
                <label className="form-label small fw-bold">สถานที่จอดรถ</label>
                <select
                  className="form-select"
                  value={selectedLotId}
                  onChange={(e) => setSelectedLotId(e.target.value)}
                >
                  {lots.map((lot) => (
                    <option key={lot.id} value={lot.id}>
                      {lot.name} (ว่าง {lot.total - lot.occupied} ช่อง - {lot.pricePerHour} บ./ชม.)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">เลือกทะเบียนรถ</label>
                {vehicles.length > 0 ? (
                  <select
                    className="form-select"
                    value={selectedPlate}
                    onChange={(e) => setSelectedPlate(e.target.value)}
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.plate}>
                        {v.plate} ({v.province}) {v.active ? '★ กำลังใช้งาน' : ''}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-danger small">ยังไม่มีทะเบียนรถในระบบ กรุณาเพิ่มก่อน</p>
                )}
              </div>

              <div className="alert alert-info py-2 small mb-4">
                <i className="bi bi-info-circle me-1"></i>
                สิทธิ์ของคุณ: <b>{user.role}</b> ({user.discountLabel})
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill fw-bold">
                <i className="bi bi-play-circle-fill me-1"></i> ยืนยันการเข้าจอด (Check-in)
              </button>
            </form>
          </div>
        ) : (
          /* Active Parking Session Display */
          <div className="active-timer-view">
            <div className="text-center mb-3">
              <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill">
                ● กำลังเข้าจอดอยู่
              </span>
              <h2 className="fs-5 fw-bold mt-2 mb-0">{activeSession.lotName}</h2>
              <span className="text-muted small">ทะเบียนรถ: <b>{activeSession.plate}</b></span>
            </div>

            {/* Circular Countdown/Timer UI */}
            <div className="timer-circles-wrapper">
              <div className="timer-unit">
                <div className="circle-display">
                  <span className="time-digit">{timerDisplay.hrs}</span>
                </div>
                <span className="unit-label">ชั่วโมง</span>
              </div>
              <span className="colon">:</span>
              <div className="timer-unit">
                <div className="circle-display">
                  <span className="time-digit">{timerDisplay.mins}</span>
                </div>
                <span className="unit-label">นาที</span>
              </div>
              <span className="colon">:</span>
              <div className="timer-unit">
                <div className="circle-display">
                  <span className="time-digit highlight">{timerDisplay.secs}</span>
                </div>
                <span className="unit-label">วินาที</span>
              </div>
            </div>

            {/* Session Detail Card */}
            <div className="session-info-card">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">เวลาเข้าจอด</span>
                <span className="fw-bold">
                  {new Date(activeSession.startTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                </span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">สิทธิ์การจอด</span>
                <span className="text-primary fw-bold">{user.role} ({user.discountLabel})</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">สถานะการชำระเงิน</span>
                {activeSession.paid ? (
                  <span className="badge bg-success">ชำระแล้ว ({activeSession.amountPaid} บ.)</span>
                ) : (
                  <span className="badge bg-warning text-dark">ยังไม่ชำระ</span>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center pt-2">
                <span className="fs-6 fw-bold">ยอดค่าบริการ</span>
                <span className="fs-4 fw-bold text-primary">
                  {activeSession.paid ? `${activeSession.amountPaid}.00` : `${currentFee}.00`} บาท
                </span>
              </div>
            </div>

            {/* QR Pass Section */}
            <div className="qr-pass-card text-center">
              <h4 className="fs-6 fw-bold mb-2">บัตรจอดรถดิจิทัล (Digital Pass)</h4>
              <p className="text-muted small mb-3">
                {activeSession.paid
                  ? 'ใช้สแกนที่ไม้กั้นทางออกเพื่อเปิดประตู'
                  : 'แสดง QR Code นี้กับเจ้าหน้าที่หรือระบบทางเข้า-ออก'}
              </p>
              <div className="qr-code-box mx-auto">
                <img src={asset('/QRCODESC.png')} alt="Gate QR" className="qr-img" />
              </div>
              <span className="small text-muted d-block mt-2 font-monospace">
                REF: {activeSession.sessionId}
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="d-flex flex-column gap-2 mt-4 mb-4">
              {!activeSession.paid ? (
                <button
                  className="btn btn-primary py-2 rounded-pill fw-bold"
                  onClick={() => navigate('/payment')}
                >
                  <i className="bi bi-credit-card-fill me-1"></i> ไปที่หน้าชำระเงิน
                </button>
              ) : (
                <button
                  className="btn btn-success py-2 rounded-pill fw-bold"
                  onClick={handleLeave}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> สแกนออกจากลานจอด (Check-out)
                </button>
              )}

              <button
                className="btn btn-outline-secondary py-2 rounded-pill"
                onClick={() => navigate('/dashboard')}
              >
                กลับสู่หน้าหลัก
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
