import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();
  
  return (
    <div className="login-container">
      <div className="wallpaper-login">
        <div className="login-logo">
          <img src="logo.png" alt="" />
        </div>
        <div className="login-box">
          <p className="login-title">เข้าสู่ระบบ</p>
          <input type="text" placeholder="USERNAME" className="input-field" />
          <input type="password" placeholder="PASSWORD" className="input-field" />
          <div className="link-container">
            <a href="#" onClick={() => navigate('/signup')}  className="link">สมัครสมาชิก</a>
            <a href="#" className="link">ลืมรหัสผ่าน?</a>
          </div>
          <hr className="line" />
          <div className="line-button-container">
          <button className="line-button " onClick={() => navigate('/dashboardv')} >LINE</button>
          </div>
        </div>
        <div className="login-with-line">
          <button className="login-button" onClick={() => navigate('/dashboard')}>เข้าสู่ระบบ</button>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
