import { useParking } from '../context/ParkingContext';
import { useNavigate } from 'react-router-dom';
import { asset } from '../utils/asset';

export default function Header() {
  const { user, role } = useParking();
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <img src={asset('/logo.png')} alt="FindPark Logo" className="brand-logo" />
          <div className="brand-text">
            <h1 className="brand-title">FIND PARKING</h1>
            <span className="brand-sub">Smart Parking System</span>
          </div>
        </div>

        <div className="user-section">
          {/* Role Status Badge (Read-only status based on login account) */}
          <span className={`role-badge ${role}`}>
            <span className={`role-dot ${role}`}></span>
            {role.toUpperCase()}
          </span>

          <img
            src={asset(user.avatar)}
            alt={user.name}
            className="user-avatar"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Weather & Smart Recommendation Banner */}
      <div className="weather-banner">
        <div className="weather-left">
          <img src={asset('/thunders.png')} alt="Weather" className="weather-icon" />
          <div className="weather-info">
            <span className="weather-temp">29°C</span>
            <span className="weather-desc">พายุฝนฟ้าคะนอง</span>
          </div>
        </div>
        <div className="weather-alert">
          <i className="bi bi-shield-exclamation text-warning me-1"></i>
          <span>แนะนำเลือก <b>อาคารจอดรถ</b> เพื่อเลี่ยงฝน</span>
        </div>
      </div>
    </header>
  );
}
