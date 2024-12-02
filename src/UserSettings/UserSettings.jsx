import React from 'react';
import './UserSettings.css';
import { useNavigate } from 'react-router-dom';

function UserSettings() {
  const navigate = useNavigate();
  return (
    <div className="settings-container">
      <div className="wallpaper9">
        <div className="profile-card">
          <img
            src="./User.jpg"
            alt="Profile"
            className="profile-image2"
          />
          <div className="profile-details">
          <div className='profile-info'>
            <p style={{ marginTop: "19px" }} className="profile-name">ศิวัฒน์ แก้วหนองสังข์</p>
            <p className="profile-type">TYPE: VISITOR</p>
            <p style={{ marginLeft: "2px" }} className="profile-info">เบอร์โทร: 096-xxx-2172</p>
            </div>
          </div>
        </div>
        <div className="menu-options">
          <br />
          <button className="menu-button">ตั้งค่าโปรไฟล์</button>
          <button className="menu-button">รายงานปัญหา</button>
          <button className="menu-button">ผูกบัญชีกับ LINE</button>
          <button className="menu-button" onClick={() => navigate('/login')}>ออกจากระบบ</button>
        </div>
        
        <div className="navbar">
            <button className="nav-button" onClick={() => navigate('/dashboardv')}>
                    <img className='icons' src="homes.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/findpark')}>
                    <img className='icons' src="search.png" alt="" />
                </button>
                <button className="nav-button active">
                    <img className='scan' src="scan.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/recentv')}>
                    <img className='icons' src="recent.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/visualv')}>
                    <img className='icons' src="userpro.png" alt="" />
                </button>

            </div>
      </div>

      
    </div>
  );
}

export default UserSettings;
