import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';

export default function ProfilePage() {
  const { user, role, vehicles, logout } = useParking();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileLayout>
      <div className="page-profile">
        {/* Profile Card */}
        <div className="profile-hero-card mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <img src={user.avatar} alt={user.name} className="profile-large-avatar" />
            <div>
              <h3 className="profile-name mb-1">{user.name}</h3>
              <div className="d-flex align-items-center gap-2">
                <span className={`badge-role-tag ${role}`}>{user.role}</span>
                <span className="small text-muted">{user.phone}</span>
              </div>
            </div>
          </div>

          <div className="profile-meta-grid">
            <div className="meta-item">
              <span className="meta-label">รหัสสมาชิก/พนักงาน</span>
              <span className="meta-val">{user.empId}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">สิทธิพิเศษ</span>
              <span className="meta-val text-success">{user.discountLabel}</span>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="profile-menu card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div
            className="menu-row"
            onClick={() => navigate('/vehicles')}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="menu-icon bg-blue">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <div>
                <h5 className="fs-6 fw-bold mb-0">จัดการทะเบียนรถ</h5>
                <span className="small text-muted">ลงทะเบียนไว้ {vehicles.length} คัน</span>
              </div>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </div>

          <div
            className="menu-row"
            onClick={() => navigate('/booking')}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="menu-icon bg-purple">
                <i className="bi bi-calendar-check-fill"></i>
              </div>
              <div>
                <h5 className="fs-6 fw-bold mb-0">การจองล่วงหน้า</h5>
                <span className="small text-muted">ดูและนัดหมายการเข้าจอด</span>
              </div>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </div>

          <div
            className="menu-row"
            onClick={() => navigate('/history')}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="menu-icon bg-teal">
                <i className="bi bi-receipt-cutoff"></i>
              </div>
              <div>
                <h5 className="fs-6 fw-bold mb-0">ประวัติและใบเสร็จ</h5>
                <span className="small text-muted">ดาวน์โหลดใบเสร็จย้อนหลัง</span>
              </div>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </div>

          <div
            className="menu-row"
            onClick={() => alert('ผูกบัญชี LINE สำเร็จ (จำลอง)')}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="menu-icon bg-green">
                <i className="bi bi-chat-dots-fill"></i>
              </div>
              <div>
                <h5 className="fs-6 fw-bold mb-0">ผูกบัญชีกับ LINE</h5>
                <span className="small text-muted">รับการแจ้งเตือนค่าจอดผ่าน LINE</span>
              </div>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </div>

          <div
            className="menu-row"
            onClick={() => alert('ระบบแจ้งปัญหาเปิดให้บริการ 24 ชม. ที่เบอร์ 02-xxx-xxxx')}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="menu-icon bg-orange">
                <i className="bi bi-question-circle-fill"></i>
              </div>
              <div>
                <h5 className="fs-6 fw-bold mb-0">รายงานปัญหา / ติดต่อ</h5>
                <span className="small text-muted">ติดต่อเจ้าหน้าที่ลานจอด</span>
              </div>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </div>
        </div>

        <button
          className="btn btn-outline-danger w-100 py-2 rounded-pill fw-bold mb-4"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-1"></i> ออกจากระบบ
        </button>
      </div>
    </MobileLayout>
  );
}
