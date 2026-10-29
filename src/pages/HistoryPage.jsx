import { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';
import { asset } from '../utils/asset';

export default function HistoryPage() {
  const { history, bookings } = useParking();
  const [tab, setTab] = useState('parking');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  return (
    <MobileLayout>
      <div className="page-history">
        <h2 className="page-heading mb-3">ประวัติการใช้งาน</h2>

        {/* Tab Switcher */}
        <div className="filter-pills mb-3">
          <button
            className={`filter-btn ${tab === 'parking' ? 'active' : ''}`}
            onClick={() => setTab('parking')}
          >
            ประวัติการเข้าจอด ({history.length})
          </button>
          <button
            className={`filter-btn ${tab === 'bookings' ? 'active' : ''}`}
            onClick={() => setTab('bookings')}
          >
            การจองล่วงหน้า ({bookings.length})
          </button>
        </div>

        {tab === 'parking' ? (
          <div className="history-list mb-4">
            {history.length === 0 ? (
              <p className="text-muted small text-center py-4 bg-light rounded-4">
                ยังไม่มีประวัติการเข้าจอด
              </p>
            ) : (
              history.map((item) => (
                <div key={item.id} className="card p-3 border-0 shadow-sm rounded-4 mb-2">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="badge bg-light text-secondary border mb-1">
                        {item.receiptNo}
                      </span>
                      <h4 className="fs-6 fw-bold mb-0">{item.lotName}</h4>
                      <span className="small text-muted">{item.date} • ทะเบียน {item.plate}</span>
                    </div>
                    <span className="fs-5 fw-bold text-primary">{item.fee}.00 ฿</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
                    <span>
                      <i className="bi bi-clock me-1"></i>
                      {item.entryTime} - {item.exitTime} ({item.durationHours} ชม.)
                    </span>
                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill py-0 px-2"
                      onClick={() => setSelectedReceipt(item)}
                    >
                      ใบเสร็จ
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bookings-list mb-4">
            {bookings.length === 0 ? (
              <p className="text-muted small text-center py-4 bg-light rounded-4">
                ยังไม่มีการจอง
              </p>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="card p-3 border-0 shadow-sm rounded-4 mb-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h4 className="fs-6 fw-bold mb-1">{b.lotName}</h4>
                      <p className="small text-muted mb-1">
                        <i className="bi bi-calendar3 me-1"></i>
                        {b.date} เวลา {b.time} น.
                      </p>
                      <span className="badge bg-light text-dark border">
                        {b.plate} ({b.name})
                      </span>
                    </div>
                    <img src={asset('/QRCODESC.png')} alt="QR" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Receipt Modal */}
        {selectedReceipt && (
          <div className="modal-overlay" onClick={() => setSelectedReceipt(null)}>
            <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-custom">
                <h4 className="modal-title fs-6">
                  <i className="bi bi-receipt text-primary me-2"></i>ใบเสร็จรับเงิน
                </h4>
                <button className="btn-close-custom" onClick={() => setSelectedReceipt(null)}>×</button>
              </div>
              <div className="modal-body-custom py-3">
                <div className="text-center mb-3">
                  <img src={asset('/logo.png')} alt="Logo" style={{ width: '60px' }} />
                  <h5 className="fs-6 fw-bold mt-2 mb-0">FIND PARKING SMART SYSTEM</h5>
                  <span className="small text-muted">{selectedReceipt.receiptNo}</span>
                </div>

                <div className="bg-light p-3 rounded-4 small mb-3">
                  <div className="d-flex justify-content-between py-1">
                    <span className="text-muted">สถานที่</span>
                    <span className="fw-bold">{selectedReceipt.lotName}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <span className="text-muted">ทะเบียนรถ</span>
                    <span className="fw-bold">{selectedReceipt.plate}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <span className="text-muted">เวลาเข้า</span>
                    <span>{selectedReceipt.entryTime}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <span className="text-muted">เวลาออก</span>
                    <span>{selectedReceipt.exitTime}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <span className="text-muted">ช่องทางชำระ</span>
                    <span>{selectedReceipt.paidMethod}</span>
                  </div>
                  <div className="d-flex justify-content-between pt-2 border-top mt-2">
                    <span className="fw-bold">ยอดเงินรวม</span>
                    <span className="fw-bold text-primary fs-6">{selectedReceipt.fee}.00 บาท</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer-custom">
                <button
                  className="btn btn-primary w-100 rounded-pill"
                  onClick={() => {
                    alert('บันทึกใบเสร็จลงในอุปกรณ์แล้ว');
                    setSelectedReceipt(null);
                  }}
                >
                  <i className="bi bi-download me-1"></i> ดาวน์โหลดใบเสร็จ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
