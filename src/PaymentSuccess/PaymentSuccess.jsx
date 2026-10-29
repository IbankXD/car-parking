import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

function PaymentSuccess() {
    const navigate = useNavigate();
    return (
        <div className="success-container">
            <div className="wallpaper12">
                <div className="logo-success">
                    <img style={{ width: "150px", height: "150px"}} src="/logo.png" alt="Logo" className='img1' />
                </div>
                <div className="success-content">
                    <div className="success-icon2">
                        <img src="/check.png" alt="Success" className='img1' />
                    </div>
                    <p className="success-message">ชำระเงินเสร็จสิ้น</p>
                    <p className="success-submessage">ขอบคุณที่ใช้บริการ</p>
                </div>
                <button className="return-button" onClick={() => navigate('/qrscan')}>
                    แสดง QR Code ออกลานจอด
                </button>
                <div style={{ marginTop: '15px' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: 'transparent',
                            border: '1px solid #fd6e2b',
                            color: '#fd6e2b',
                            borderRadius: '25px',
                            padding: '8px 24px',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        กลับหน้าหลัก
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
