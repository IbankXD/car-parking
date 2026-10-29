import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, activeSession, lots, bookings, calculateCurrentFee } = useParking();

  // Elapsed time for active session
  const [elapsed, setElapsed] = useState('00:00:00');
  const [currentFee, setCurrentFee] = useState(0);

  useEffect(() => {
    if (!activeSession) return;

    const updateTimer = () => {
      const diffMs = Math.max(0, Date.now() - activeSession.startTime);
      const totalSec = Math.floor(diffMs / 1000);
      const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const secs = String(totalSec % 60).padStart(2, '0');
      setElapsed(`${hrs}:${mins}:${secs}`);
      setCurrentFee(calculateCurrentFee(activeSession));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeSession, calculateCurrentFee]);

  const totalCapacity = lots.reduce((acc, l) => acc + l.total, 0);
  const totalOccupied = lots.reduce((acc, l) => acc + l.occupied, 0);
  const totalAvailable = totalCapacity - totalOccupied;

  return (
    <MobileLayout>
      <div className="page-dashboard">
        {/* User Status Card */}
        <div className="user-welcome-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted small">ยินดีต้อนรับ</span>
              <h2 className="user-name mb-0">{user.name}</h2>
              <div className="d-flex align-items-center gap-2 mt-1">
                <span className="badge-role">{user.role}</span>
                <span className="text-secondary small">{user.phone}</span>
              </div>
            </div>
            <div className="privilege-badge">
              <i className="bi bi-gift-fill text-warning me-1"></i>
              <span>{user.discountLabel}</span>
            </div>
          </div>
        </div>

        {/* Active Parking Status (If currently parked) */}
        {activeSession ? (
          <div className="active-session-card">
            <div className="card-top">
              <div className="d-flex align-items-center gap-2">
                <span className="live-indicator"></span>
                <span className="fw-bold">กำลังจอดอยู่ ณ ปัจจุบัน</span>
              </div>
              <span className="badge bg-light text-dark fw-normal">{activeSession.plate}</span>
            </div>

            <div className="session-body">
              <div className="session-lot-info">
                <i className="bi bi-p-square-fill text-primary fs-3"></i>
                <div>
                  <h4 className="mb-0 fs-6 fw-bold">{activeSession.lotName}</h4>
                  <span className="small text-muted">
                    เข้าจอด: {new Date(activeSession.startTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                  </span>
                </div>
              </div>

              <div className="timer-box">
                <div className="timer-value">{elapsed}</div>
                <div className="timer-label">ระยะเวลาที่จอด</div>
              </div>

              <div className="fee-summary">
                <span>ค่าบริการสะสม:</span>
                <span className="fee-amount">{currentFee} บาท</span>
              </div>

              <div className="session-actions">
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() => navigate('/parking-timer')}
                >
                  <i className="bi bi-qr-code-scan me-1"></i> ดูบัตรจอดรถ / ชำระเงิน
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="quick-park-banner" onClick={() => navigate('/findpark')}>
            <div className="banner-content">
              <div className="banner-icon">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <div>
                <h4 className="banner-title">ยังไม่มีการเข้าจอด</h4>
                <p className="banner-sub">มีที่จอดว่าง <b>{totalAvailable}</b> ช่อง จาก 4 ลานจอด</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm">ค้นหาที่จอด</button>
          </div>
        )}

        {/* Quick Actions Grid */}
        <section className="section-container">
          <h3 className="section-title">
            <i className="bi bi-grid-fill text-primary me-2"></i>เมนูหลัก
          </h3>
          <div className="actions-grid">
            <div className="action-btn" onClick={() => navigate('/findpark')}>
              <div className="action-icon bg-blue">
                <i className="bi bi-search"></i>
              </div>
              <span>ดูลานจอด</span>
            </div>

            <div className="action-btn" onClick={() => navigate('/parking-timer')}>
              <div className="action-icon bg-orange">
                <i className="bi bi-stopwatch"></i>
              </div>
              <span>การเข้าจอด</span>
            </div>

            <div className="action-btn" onClick={() => navigate('/booking')}>
              <div className="action-icon bg-purple">
                <i className="bi bi-calendar-check"></i>
              </div>
              <span>จองที่จอด</span>
            </div>

            <div className="action-btn" onClick={() => navigate('/vehicles')}>
              <div className="action-icon bg-green">
                <i className="bi bi-car-front"></i>
              </div>
              <span>จัดการรถ</span>
            </div>

            <div className="action-btn" onClick={() => navigate('/payment')}>
              <div className="action-icon bg-red">
                <i className="bi bi-receipt"></i>
              </div>
              <span>ใบเสร็จ/จ่าย</span>
            </div>

            <div className="action-btn" onClick={() => navigate('/history')}>
              <div className="action-icon bg-teal">
                <i className="bi bi-clock-history"></i>
              </div>
              <span>ประวัติ</span>
            </div>
          </div>
        </section>

        {/* Live Slot Summary */}
        <section className="section-container">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="section-title mb-0">
              <i className="bi bi-bar-chart-fill text-success me-2"></i>สถานะลานจอดสด
            </h3>
            <span className="small text-primary" onClick={() => navigate('/findpark')} style={{ cursor: 'pointer' }}>
              ดูทั้งหมด <i className="bi bi-chevron-right"></i>
            </span>
          </div>

          <div className="lots-mini-list">
            {lots.map((lot) => {
              const free = lot.total - lot.occupied;
              const percent = Math.round((lot.occupied / lot.total) * 100);
              const statusColor = percent > 80 ? 'danger' : percent > 50 ? 'warning' : 'success';

              return (
                <div key={lot.id} className="lot-mini-card" onClick={() => navigate('/findpark')}>
                  <div className="lot-mini-info">
                    <span className="lot-mini-name">{lot.name}</span>
                    <span className={`badge bg-${statusColor}-subtle text-${statusColor} border border-${statusColor}`}>
                      ว่าง {free} / {lot.total}
                    </span>
                  </div>
                  <div className="progress mt-2" style={{ height: '6px' }}>
                    <div
                      className={`progress-bar bg-${statusColor}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Bookings */}
        {bookings.length > 0 && (
          <section className="section-container mb-4">
            <h3 className="section-title">
              <i className="bi bi-pin-angle-fill text-danger me-2"></i>การนัดหมาย / จองล่วงหน้า
            </h3>
            <div className="booking-ticket-card" onClick={() => navigate('/booking')}>
              <div className="ticket-header">
                <div>
                  <span className="ticket-tag">ยืนยันแล้ว</span>
                  <h4 className="ticket-lot">{bookings[0].lotName}</h4>
                </div>
                <img src="/QRCODESC.png" alt="Ticket QR" className="ticket-qr" />
              </div>
              <div className="ticket-details">
                <div>
                  <span className="text-muted small">วันที่ & เวลา</span>
                  <p className="mb-0 fw-bold">{bookings[0].date} • {bookings[0].time} น.</p>
                </div>
                <div>
                  <span className="text-muted small">ทะเบียนรถ</span>
                  <p className="mb-0 fw-bold">{bookings[0].plate}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </MobileLayout>
  );
}
