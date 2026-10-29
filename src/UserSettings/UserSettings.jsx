import './UserSettings.css';
import { useNavigate } from 'react-router-dom';

function UserSettings() {
  const navigate = useNavigate();
  return (
    <div className="settings-container">
      <div className="wallpaper9">
        <div className="profile-card">
          <img
            src="/User.jpg"
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
          <button className="menu-button" onClick={() => alert('ฟังก์ชันตั้งค่าโปรไฟล์กำลังพัฒนา')}>ตั้งค่าโปรไฟล์</button>
          <button className="menu-button" onClick={() => alert('ฟังก์ชันรายงานปัญหากำลังพัฒนา')}>รายงานปัญหา</button>
          <button className="menu-button" onClick={() => alert('ฟังก์ชันผูกบัญชีกับ LINE กำลังพัฒนา')}>ผูกบัญชีกับ LINE</button>
          <button className="menu-button" onClick={() => navigate('/login')}>ออกจากระบบ</button>
        </div>
        
        <div className="navbar">
          <button className="nav-button" onClick={() => navigate('/dashboardv')}>
            <img className='icons' src="/homes.png" alt="Home" />
          </button>
          <button className="nav-button" onClick={() => navigate('/findparkm')}>
            <img className='icons' src="/search.png" alt="Search" />
          </button>
          <button className="nav-button active" onClick={() => navigate('/parking')}>
            <img className='scan' src="/scan.png" alt="Scan" />
          </button>
          <button className="nav-button" onClick={() => navigate('/recentv')}>
            <img className='icons' src="/recent.png" alt="Recent" />
          </button>
          <button className="nav-button" onClick={() => navigate('/visualv')}>
            <img className='icons' src="/userpro.png" alt="Profile" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
