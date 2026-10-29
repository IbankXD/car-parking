import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recent.css';

function Recents() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('parking_appointments') || '[]');
      setAppointments(saved);
    } catch {
      setAppointments([]);
    }
  }, []);

  return (
    <div className='wallpaper-recent'>
      <div className='recent-container'>
        {/* แสดงประวัติการจองจากฟอร์มถ้ามี */}
        {appointments.map((item) => (
          <div key={item.id} className='recent-content'>
            <br />
            <p style={{ marginTop: "0.4rem", marginLeft: "1rem" }}>ชื่อ : {item.name}</p>
            <p style={{ marginLeft: "1rem" }}>สถานที่ : {item.location || 'ลานจอดกลางแจ้ง 1'}</p>
            <p style={{ marginLeft: "1rem" }}>วันที่ : {item.date} {item.time}</p>
            <p style={{ marginLeft: "1rem" }}>ทะเบียนรถ : {item.carNumber}</p>
            <img className='img-recent-car' src="/Car.png" alt="Car" />
            <div className='more-recent' onClick={() => navigate('/historypayment')} style={{ top: 'auto', bottom: '10px' }}>
              <button className='more-button'>เพิ่มเติม</button>
            </div>
          </div>
        ))}

        {/* ประวัติการเข้าจอดตัวอย่าง */}
        <div className='recent-content'>
          <br />
          <p style={{ marginTop: "0.4rem", marginLeft: "1rem" }}>ชื่อ : ศิวัฒน์ แก้ว</p>
          <p style={{ marginLeft: "1rem" }}>สถานที่ : ลานจอดกลางแจ้ง 1</p>
          <p style={{ marginLeft: "1rem" }}>วันที่ : 1 / 11 / 2567</p>
          <p style={{ marginLeft: "1rem" }}>ทะเบียนรถ : กก 1234</p>
          <img className='img-recent-car' src="/Car.png" alt="Car" />
          <div className='more-recent' onClick={() => navigate('/historypayment')}>
            <button className='more-button'>เพิ่มเติม</button>
          </div>
        </div>

        <div className='recent-content'>
          <br />
          <p style={{ marginTop: "0.4rem", marginLeft: "1rem" }}>ชื่อ : ศิวัฒน์ แก้ว</p>
          <p style={{ marginLeft: "1rem" }}>สถานที่ : ลานจอดกลางแจ้ง 1</p>
          <p style={{ marginLeft: "1rem" }}>วันที่ : 1 / 11 / 2567</p>
          <p style={{ marginLeft: "1rem" }}>ทะเบียนรถ : กก 1234</p>
          <img className='img-recent-car' src="/Car.png" alt="Car" />
          <div className='more-recent' onClick={() => navigate('/historypayment')}>
            <button className='more-button'>เพิ่มเติม</button>
          </div>
        </div>
      </div>

      <div className='navbar-recent'>
        <div className="navbar">
          <button className="nav-button" onClick={() => navigate('/dashboard')}>
            <img className='icons' src="/homes.png" alt="Home" />
          </button>
          <button className="nav-button" onClick={() => navigate('/findpark')}>
            <img className='icons' src="/search.png" alt="Search" />
          </button>
          <button className="nav-button" onClick={() => navigate('/parking')}>
            <img className='scan' src="/scan.png" alt="Parking" />
          </button>
          <button className="nav-button active" onClick={() => navigate('/recent')}>
            <img className='icons' src="/recent.png" alt="Recent" />
          </button>
          <button className="nav-button" onClick={() => navigate('/visualp')}>
            <img className='icons' src="/userpro.png" alt="Profile" />
          </button>
        </div>
      </div>

      <div className='recent-info-use'>
        <h4 style={{ fontSize: "12px" }}>Siwat Kaewnongsung</h4>
        <p>TYPE : MEMBER</p>
      </div>

      <div className='setnoti-recent'>
        <div className='setnoti-dash'>
          <div className='setting-dash'>
            <button onClick={() => navigate('/usersettingsm')} style={{ backgroundColor: "transparent", border: "none" }}>
              <span><img style={{ width: "19px", height: "19px" }} src="/Settings.png" alt="Settings" /></span>
            </button>
          </div>
          <div className='notify-dash'>
            <button style={{ backgroundColor: "transparent", border: "none" }}>
              <span><img style={{ width: "17px", height: "19px" }} src="/notify.png" alt="Notify" /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recents;
