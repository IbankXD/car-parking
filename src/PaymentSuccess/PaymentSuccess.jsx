import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

function PaymentSuccess({ onReturnToHome }) {
    const navigate = useNavigate();
    return (
        <div className="success-container">
            <div className="wallpaper12">
                <div className="logo-success">
                    <img style={{ width: "150px", height: "150px"}} src="logo.png" alt="" className='img1' />
                </div>
                <div className="success-content">
                    <div className="success-icon2">
                        <img  src="check.png" alt="Success"className='img1' />
                    </div>
                    <p className="success-message">ชำระเงินเสร็จสิ้น</p>
                    <p className="success-submessage">ขอบคุณที่ใช้บริการ</p>
                </div>
                <button className="return-button" onClick={() => navigate('/Qrscan')}>
                    แสดงQRcode
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
