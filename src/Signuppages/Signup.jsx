import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('visitor'); // สถานะเริ่มต้นเป็น visitor

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className='wallpaper'>
      <div className="signup-container">
        <div className="form-container">
          <h2 className='title-mem'>สมัครสมาชิก</h2>
          <h3 className='title-mem2'>ข้อมูลส่วนตัว</h3>
          <form>
            <label>
              บทบาท
              <select value={role} onChange={handleRoleChange}>
                <option value="visitor">VISITOR</option>
                <option value="member">MEMBER</option>
              </select>
            </label>

            <label>
              ชื่อผู้ใช้
              <input className='input-user' type="text" placeholder="กรอกชื่อผู้ใช้" />
            </label>

            <label>
              รหัสผ่าน
              <input className='input-pass' type="password" placeholder="กรอกรหัสที่ต้องการ" />
            </label>

            <label>
              ยืนยันรหัสผ่าน
              <input type="password" placeholder="กรอกรหัสที่ต้องการ" />
            </label>

            <label>
              เบอร์โทรศัพท์
              <input type="number" placeholder="กรอกเบอร์โทรศัพท์" />
            </label>

            {/* แสดง input รหัสพนักงานเฉพาะเมื่อเลือก MEMBER */}
            {role === 'member' && (
              <label>
                รหัสพนักงาน
                <input type="text" placeholder="กรอกรหัสพนักงาน" />
              </label>
            )}

            <button
              className='signup-button'
              onClick={() => {
                alert('สมัครสมาชิกสําเร็จ');
                navigate('/login'); // นำทางไปหน้า Login
              }}
              type="submit"
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </div>
      <div className="logo-container-signup">
        <img src="logo.png" alt="Metthier Logo" className="logo-signup" />
      </div>
    </div>
  );
}

export default Signup;
