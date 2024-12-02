import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentOptions.css';

function PaymentOptions() {
  const [selectedPayment, setSelectedPayment] = useState('truemoney');
  const navigate = useNavigate();


  const handleSelectPayment = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const qrCodeUrl = selectedPayment === 'truemoney'
    ? './truemoney.png'  // ใส่ URL ของ QR Code ของ TrueMoney
    : './pp.png'; // ใส่ URL ของ QR Code ของ PromptPay

  return (
    <div className="payment-container">
      <div className="wallpaper11">
        <div className="logo-payop" >
          <img style={{ width: "150px", height: "150px",marginBottom: "40px" }} src="./logo.png" alt="" className='' />
        </div>
        <div className='payment-box'>
          <h4 className="payment-title">เลือกช่องทางการชําระเงิน</h4>
          <div className="qr-code-container">
              <button onClick={() => navigate('/paymentsuccess')} style={{ backgroundColor: "transparent", border: "none" }} ><img src={qrCodeUrl} alt="QR Code" className="qr-code" /></button>
          </div>
          <div className="payment-options">
            <button
              className={`payment-button ${selectedPayment === 'truemoney' ? 'selected' : ''}`}
              onClick={() => handleSelectPayment('truemoney')}
            >
              <img src="./ictm.png" alt="TrueMoney" className="button-logo" />
              TrueMoney Wallet
            </button>
            <button
              className={`payment-button ${selectedPayment === 'promptpay' ? 'selected' : ''}`}
              onClick={() => handleSelectPayment('promptpay')}
            >
              <img src="./icpp.png" alt="QR PromptPay" className="button-logo2" />
              QR PromptPay
            </button>
          </div>
        </div>
        <div className="backbtn-back">
          <button className='backbtn1 bi bi-arrow-left' style={{width: "80px", height: "80px",borderRadius: "50%"}} onClick={() => navigate(-1)}></button>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;
