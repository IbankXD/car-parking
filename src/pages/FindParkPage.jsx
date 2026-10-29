import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';

export default function FindParkPage() {
  const { lots, startParking, activeSession, vehicles } = useParking();
  const [filter, setFilter] = useState('all');
  const [navModal, setNavModal] = useState(null);
  const navigate = useNavigate();

  const filteredLots = lots.filter((lot) => {
    if (filter === 'outdoor') return lot.type === 'outdoor';
    if (filter === 'indoor') return lot.type === 'indoor';
    return true;
  });

  const handleStartParking = (lotId) => {
    if (activeSession) {
      alert(`คุณกำลังจอดอยู่ที่ "${activeSession.lotName}" แล้ว กรุณาเช็คเอาท์ออกก่อนครับ`);
      navigate('/parking-timer');
      return;
    }
    const defaultPlate = vehicles.find((v) => v.active)?.plate || 'กก 1234';
    startParking(lotId, defaultPlate);
    alert('บันทึกเวลาเข้าจอดเรียบร้อยแล้ว!');
    navigate('/parking-timer');
  };

  return (
    <MobileLayout>
      <div className="page-findpark">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="page-heading mb-0">ค้นหาลานจอดรถ</h2>
            <span className="text-muted small">ตรวจสอบความว่างและเลือกจุดจอด</span>
          </div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-3 py-2 rounded-pill">
            {lots.length} จุดบริการ
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="filter-pills mb-3">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ทั้งหมด
          </button>
          <button
            className={`filter-btn ${filter === 'indoor' ? 'active' : ''}`}
            onClick={() => setFilter('indoor')}
          >
            <i className="bi bi-building me-1"></i> ในอาคาร (แนะนำ)
          </button>
          <button
            className={`filter-btn ${filter === 'outdoor' ? 'active' : ''}`}
            onClick={() => setFilter('outdoor')}
          >
            <i className="bi bi-sun me-1"></i> กลางแจ้ง
          </button>
        </div>

        {/* Lots List */}
        <div className="lots-container">
          {filteredLots.map((lot) => {
            const available = lot.total - lot.occupied;
            const percent = Math.round((lot.occupied / lot.total) * 100);
            let statusText = 'ว่างมาก';
            let statusBadge = 'success';

            if (percent > 85) {
              statusText = 'ใกล้เต็ม';
              statusBadge = 'danger';
            } else if (percent > 55) {
              statusText = 'ปานกลาง';
              statusBadge = 'warning';
            }

            return (
              <div key={lot.id} className="lot-card">
                <div className="lot-image-wrapper">
                  <img src={lot.image} alt={lot.name} className="lot-image" />
                  <span className={`lot-badge-type ${lot.type}`}>
                    {lot.type === 'indoor' ? 'ในอาคาร' : 'กลางแจ้ง'}
                  </span>
                  <span className={`lot-badge-status bg-${statusBadge}`}>
                    {statusText}
                  </span>
                </div>

                <div className="lot-details">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h3 className="lot-title">{lot.name}</h3>
                      <span className="lot-rate">อัตราค่าบริการ {lot.pricePerHour} บาท / ชม.</span>
                    </div>
                    <div className="text-end">
                      <div className="available-count text-primary">{available}</div>
                      <span className="available-label">ช่องว่าง / {lot.total}</span>
                    </div>
                  </div>

                  <div className="progress mb-3" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar bg-${statusBadge}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <div className="lot-actions">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setNavModal(lot)}
                    >
                      <i className="bi bi-sign-turn-right me-1"></i> นำทาง
                    </button>
                    <button
                      className="btn btn-primary btn-sm flex-grow-1"
                      onClick={() => handleStartParking(lot.id)}
                    >
                      <i className="bi bi-box-arrow-in-right me-1"></i> เข้าจอดที่นี่
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Simulated Modal */}
        {navModal && (
          <div className="modal-overlay" onClick={() => setNavModal(null)}>
            <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-custom">
                <h4 className="modal-title fs-6">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>เส้นทางไป {navModal.name}
                </h4>
                <button className="btn-close-custom" onClick={() => setNavModal(null)}>×</button>
              </div>
              <div className="modal-body-custom text-center py-3">
                <img
                  src={navModal.image}
                  alt={navModal.name}
                  className="rounded mb-3 w-100"
                  style={{ maxHeight: '160px', objectFit: 'cover' }}
                />
                <div className="d-flex justify-content-around bg-light p-2 rounded mb-3">
                  <div>
                    <span className="small text-muted d-block">ระยะทาง</span>
                    <strong className="text-primary fs-5">450 ม.</strong>
                  </div>
                  <div>
                    <span className="small text-muted d-block">เวลาเดินทาง</span>
                    <strong className="text-success fs-5">2 นาที</strong>
                  </div>
                  <div>
                    <span className="small text-muted d-block">ช่องว่าง</span>
                    <strong className="fs-5">{navModal.total - navModal.occupied} คัน</strong>
                  </div>
                </div>
                <p className="small text-muted mb-0">
                  <i className="bi bi-info-circle me-1"></i>
                  ระบบนำทางจำลองเปิดใช้งาน GPS ตรงไปยังทางเข้าไม้กั้น
                </p>
              </div>
              <div className="modal-footer-custom">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    setNavModal(null);
                    handleStartParking(navModal.id);
                  }}
                >
                  เริ่มเข้าจอด ณ จุดนี้
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
