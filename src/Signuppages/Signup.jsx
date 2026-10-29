import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import { asset } from '../utils/asset';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useParking();

  const [role, setRole] = useState('visitor');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    employeeId: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.username.trim() || !formData.phone.trim() || !formData.password) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (formData.password.length < 4) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    if (role === 'member' && !formData.employeeId.trim()) {
      setError('กรุณากรอกรหัสพนักงานสำหรับสมาชิกประเภท Member');
      return;
    }

    setIsLoading(true);
    const result = await signup({
      name: formData.name.trim(),
      username: formData.username.trim(),
      phone: formData.phone.trim(),
      role,
      employeeId: role === 'member' ? formData.employeeId.trim() : '-',
      password: formData.password
    });
    setIsLoading(false);

    if (result.success) {
      alert('สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่ระบบ Find Parking!');
      navigate('/dashboard');
    } else {
      setError(result.message || 'การสมัครสมาชิกล้มเหลว');
    }
  };

  return (
    <div className="app-viewport">
      <div className="mobile-shell d-flex flex-column justify-content-center p-4">
        <div className="text-center mb-3">
          <img src={asset('/logo.png')} alt="FindPark Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} className="mb-2" />
          <h1 className="fs-5 fw-bold text-dark mb-0">สมัครสมาชิกใหม่</h1>
          <p className="text-muted small">ระบบจัดการที่จอดรถอัจฉริยะ</p>
        </div>

        <div className="card p-3 border-0 shadow-sm rounded-4 mb-3">
          {error && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Switcher */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">ประเภทสมาชิก</label>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={`btn flex-grow-1 rounded-pill py-2 small fw-bold ${
                    role === 'visitor' ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setRole('visitor')}
                >
                  <i className="bi bi-person me-1"></i> VISITOR (ทั่วไป)
                </button>
                <button
                  type="button"
                  className={`btn flex-grow-1 rounded-pill py-2 small fw-bold ${
                    role === 'member' ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setRole('member')}
                >
                  <i className="bi bi-badge-ad me-1"></i> MEMBER (พนักงาน)
                </button>
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label small fw-bold text-muted">ชื่อ - นามสกุล</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm bg-light"
                placeholder="เช่น สมชาย ใจดี"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label small fw-bold text-muted">ชื่อผู้ใช้ (Username)</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm bg-light"
                placeholder="เช่น somchai2026"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label small fw-bold text-muted">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                name="phone"
                className="form-control form-control-sm bg-light"
                placeholder="เช่น 096-xxx-xxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {role === 'member' && (
              <div className="mb-2">
                <label className="form-label small fw-bold text-muted">รหัสพนักงาน (Employee ID)</label>
                <input
                  type="text"
                  name="employeeId"
                  className="form-control form-control-sm bg-light"
                  placeholder="เช่น MET-1024"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label small fw-bold text-muted">รหัสผ่าน</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-sm bg-light"
                  placeholder="อย่างน้อย 4 ตัว"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-muted">ยืนยันรหัส</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-sm bg-light"
                  placeholder="พิมพ์ซ้ำอีกครั้ง"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 rounded-pill fw-bold mb-2"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังลงทะเบียน...' : 'ยืนยันการสมัครสมาชิก'}
            </button>
          </form>

          <div className="text-center mt-2">
            <span className="small text-muted">มีบัญชีผู้ใช้อยู่แล้ว? </span>
            <span
              onClick={() => navigate('/login')}
              className="small text-primary fw-bold"
              style={{ cursor: 'pointer' }}
            >
              เข้าสู่ระบบ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
