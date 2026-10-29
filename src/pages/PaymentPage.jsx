import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';

export default function PaymentPage() {
  const { activeSession, user, calculateCurrentFee, completePayment } = useParking();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('promptpay');
  const [isSuccess, setIsSuccess] = useState(false);

  // If there's an active session
  const fee = activeSession ? calculateCurrentFee(activeSession) : 30;
  const lotName = activeSession ? activeSession.lotName : 'ลานจอดกลางแจ้ง 1';
  const plate = activeSession ? activeSession.plate : 'กก 1234';

  const entryTime = activeSession
    ? new Date(activeSession.startTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    : '09:00';
  const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  const handlePay = () => {
    if (activeSession) {
      completePayment(paymentMethod === 'promptpay' ? 'PromptPay' : 'TrueMoney');
      setIsSuccess(true);
    } else {
      alert('ชำระค่าบริการเรียบร้อย');
      navigate('/history');
    }
  };

  if (isSuccess) {
    return (
      <MobileLayout hideNav={true}>
        <div className="page-payment-success text-center py-5">
          <div className="success-icon-animated mb-3">
            <i className="bi bi-check-circle-fill text-success fs-1"></i>
          </div>
          <h2 className="fs-4 fw-bold text-success mb-1">ชำระเงินสำเร็จแล้ว!</h2>
          <p className="text-muted small mb-4">ขอบคุณที่ใช้บริการ Smart Parking</p>

          <div className="receipt-summary-card p-3 bg-light rounded-4 text-start mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">สถานที่</span>
              <span className="fw-bold">{lotName}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">ทะเบียนรถ</span>
              <span className="fw-bold">{plate}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">ช่องทางชำระเงิน</span>
              <span className="fw-bold">{paymentMethod === 'promptpay' ? 'QR PromptPay' : 'TrueMoney'}</span>
            </div>
            <div className="d-flex justify-content-between pt-2 border-top">
              <span className="fw-bold">ยอดที่ชำระ</span>
              <span className="fw-bold text-primary fs-5">{fee}.00 บาท</span>
            </div>
          </div>

          <div className="card p-3 border-0 shadow-sm rounded-4 mb-4">
            <h5 className="fs-6 fw-bold mb-2">สแกนเพื่อเปิดไม้กั้นออกจากลานจอด</h5>
            <p className="small text-muted mb-3">ใช้ได้ 1 ครั้ง ภายใน 15 นาทีหลังจากชำระเงิน</p>
            <img src="/Vcards.png" alt="Exit Pass" className="img-fluid rounded mx-auto" style={{ maxHeight: '180px' }} />
          </div>

          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-primary py-2 rounded-pill fw-bold"
              onClick={() => navigate('/parking-timer')}
            >
              ไปที่หน้าเช็คเอาท์ (สแกนออก)
            </button>
            <button
              className="btn btn-outline-secondary py-2 rounded-pill"
              onClick={() => navigate('/dashboard')}
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="page-payment">
        <h2 className="page-heading mb-3">ชำระค่าบริการที่จอดรถ</h2>

        {/* Detailed Bill / Receipt Breakdown */}
        <div className="receipt-card mb-4">
          <div className="receipt-header">
            <div>
              <span className="text-muted small">หมายเลขรายการ</span>
              <h4 className="receipt-id">#{activeSession ? activeSession.sessionId : 'SAMPLE-00234'}</h4>
            </div>
            <span className="badge bg-primary">{user.role}</span>
          </div>

          <div className="receipt-details">
            <div className="d-flex justify-content-between py-1">
              <span className="text-muted">ผู้ใช้งาน</span>
              <span className="fw-bold">{user.name}</span>
            </div>
            <div className="d-flex justify-content-between py-1">
              <span className="text-muted">สถานที่จอด</span>
              <span className="fw-bold">{lotName}</span>
            </div>
            <div className="d-flex justify-content-between py-1">
              <span className="text-muted">ทะเบียนรถ</span>
              <span className="fw-bold">{plate}</span>
            </div>
            <div className="d-flex justify-content-between py-1">
              <span className="text-muted">เวลาเข้า</span>
              <span>{entryTime} น.</span>
            </div>
            <div className="d-flex justify-content-between py-1">
              <span className="text-muted">เวลาออก (ปัจจุบัน)</span>
              <span>{currentTime} น.</span>
            </div>
            <div className="d-flex justify-content-between py-1">
              <span className="text-muted">สิทธิ์ส่วนลด</span>
              <span className="text-success">{user.discountLabel}</span>
            </div>
          </div>

          <div className="receipt-total">
            <span>ยอดชำระสุทธิ</span>
            <span className="total-amount">{fee}.00 บาท</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="payment-method-card mb-4">
          <h4 className="fs-6 fw-bold mb-3">เลือกช่องทางการชำระเงิน</h4>

          <div className="payment-tabs mb-3">
            <button
              className={`method-btn ${paymentMethod === 'promptpay' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('promptpay')}
            >
              <img src="/icpp.png" alt="PromptPay" className="method-icon" />
              <span>QR PromptPay</span>
            </button>
            <button
              className={`method-btn ${paymentMethod === 'truemoney' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('truemoney')}
            >
              <img src="/ictm.png" alt="TrueMoney" className="method-icon" />
              <span>TrueMoney</span>
            </button>
          </div>

          {/* QR Code Presentation */}
          <div className="qr-presentation text-center py-3 bg-light rounded-4">
            <img
              src={paymentMethod === 'promptpay' ? '/pp.png' : '/truemoney.png'}
              alt="Payment QR"
              className="payment-qr-image"
            />
            <p className="small text-muted mt-2 mb-0">
              สแกน QR ผ่านแอปธนาคารหรือ TrueMoney เพื่อชำระเงิน
            </p>
          </div>
        </div>

        <button
          className="btn btn-primary w-100 py-3 rounded-pill fw-bold fs-6 mb-4 shadow"
          onClick={handlePay}
        >
          <i className="bi bi-shield-check me-1"></i> ยืนยันการชำระเงิน {fee}.00 บาท
        </button>
      </div>
    </MobileLayout>
  );
}
