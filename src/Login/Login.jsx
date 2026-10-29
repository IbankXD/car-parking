import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithLine } = useParking();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setIsLoading(true);
    const result = await login(username.trim(), password.trim());
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleLineLogin = async () => {
    setIsLoading(true);
    await loginWithLine();
    setIsLoading(false);
    navigate('/dashboard');
  };

  const fillDemo = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="app-viewport">
      <div className="mobile-shell d-flex flex-column justify-content-center p-4">
        {/* Brand Header */}
        <div className="text-center mb-4">
          <img src="/logo.png" alt="FindPark Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} className="mb-2" />
          <h1 className="fs-4 fw-bold text-dark mb-1">FIND PARKING</h1>
          <p className="text-muted small">ระบบบริหารจัดการที่จอดรถอัจฉริยะ</p>
        </div>

        {/* Login Box */}
        <div className="card p-4 border-0 shadow-sm rounded-4 mb-3">
          <h2 className="fs-5 fw-bold mb-3 text-center">เข้าสู่ระบบ</h2>

          {error && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">ชื่อผู้ใช้ (USERNAME)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="กรอกชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">รหัสผ่าน (PASSWORD)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control bg-light border-start-0 border-end-0"
                  placeholder="กรอกรหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-start-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span
                onClick={() => navigate('/signup')}
                className="text-primary small fw-bold"
                style={{ cursor: 'pointer' }}
              >
                สมัครสมาชิกใหม่
              </span>
              <span
                onClick={() => alert('หากลืมรหัสผ่าน กรุณาติดต่อแผนก IT หรือโทร 02-xxx-xxxx')}
                className="text-muted small"
                style={{ cursor: 'pointer' }}
              >
                ลืมรหัสผ่าน?
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 rounded-pill fw-bold mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2"></span>กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>

          <div className="position-relative text-center my-2">
            <hr className="text-muted" />
            <span
              className="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted"
              style={{ fontSize: '11px' }}
            >
              หรือ
            </span>
          </div>

          {/* LINE Login Button */}
          <button
            type="button"
            className="btn w-100 py-2 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
            style={{ backgroundColor: '#06C755' }}
            onClick={handleLineLogin}
            disabled={isLoading}
          >
            <i className="bi bi-chat-fill"></i>
            เข้าใช้งานด่วนด้วย LINE (Visitor)
          </button>
        </div>

        {/* Quick Demo Credentials */}
        <div className="card p-3 border-0 bg-light rounded-4 text-center">
          <span className="small text-muted fw-bold mb-2 d-block">
            ⚡ บัญชีทดลองใช้งานด่วน (One-Click Demo):
          </span>
          <div className="d-flex gap-2 justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-pill px-3"
              onClick={() => fillDemo('member', '1234')}
            >
              Member (พนักงาน)
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill px-3"
              onClick={() => fillDemo('visitor', '1234')}
            >
              Visitor (ผู้มาติดต่อ)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
