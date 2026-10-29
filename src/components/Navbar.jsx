import { useLocation, useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeSession } = useParking();

  const navItems = [
    { path: '/dashboard', label: 'หน้าหลัก', icon: 'bi-house-door-fill' },
    { path: '/findpark', label: 'ดูลานจอด', icon: 'bi-geo-alt-fill' },
    {
      path: '/parking-timer',
      label: 'การเข้าจอด',
      icon: 'bi-stopwatch-fill',
      isCenter: true,
      hasPulse: Boolean(activeSession)
    },
    { path: '/history', label: 'ประวัติ', icon: 'bi-clock-history' },
    { path: '/profile', label: 'โปรไฟล์', icon: 'bi-person-circle' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''} ${item.isCenter ? 'center-action' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div className="icon-wrapper">
              <i className={`bi ${item.icon}`}></i>
              {item.hasPulse && <span className="pulse-dot"></span>}
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
