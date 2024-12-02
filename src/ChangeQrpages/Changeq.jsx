import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Changeq.css';

function Changeq() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(''); // เก็บข้อความที่ค้นหา
  const [cars] = useState([
    { id: 1, license: 'กนพ3344', active: true },
    { id: 2, license: 'สนย2322', active: true },
    { id: 3, license: 'ขกท5555', active: false },
    { id: 4, license: 'มยท9334', active: false },
  ]); // ลิสต์ทะเบียนรถทั้งหมด

  // กรองผลลัพธ์ตามข้อความค้นหา
  const filteredCars = cars.filter((car) =>
    car.license.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="wallpaper5">
      <div className="qr-logos">
        <img style={{ width: "150px", height: "150px" }} src="logo2.png" alt="" />
      </div>
    <div className="qr-form">

      <div className="qr-find">
        <input
          className="qr-input"
          type="text"
          placeholder="กรอกทะเบียนรถเพื่อค้นหา"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // อัปเดตข้อความค้นหา
        />
      </div>

      <div className="qr-search">
        <button
          className="qr-btn-search"
          style={{
            borderRadius: "50%",
            backgroundColor: "transparent",
            width: "60px",
            height: "60px",
          }}
        >
          <img style={{ width: "30px", height: "30px" }} src="search.png" alt="" />
        </button>
      </div>

      {/* แสดงผลลัพธ์การค้นหา */}
      <div className="qr-info-container">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id}>
              <div className="qr-info1">
                <button
                  onClick={() => navigate('/visualp2')}
                  className="qr-btn-info"
                  style={{
                    borderRadius: "50px",
                    backgroundColor: car.active ? "#Fd6e2b" : "gray",
                    height: "30px",
                  }}
                >
                  แสดงการ์ด
                </button>
              </div>
              <p
                className="qr-title"
                style={{ fontSize: "17px", color: "white" }}
              >
                {car.license}
              </p>
            </div>
          ))
        ) : (
          <p className='no-find-qr' style={{ textAlign: "center", color: "#000" }}>
            ไม่พบทะเบียนรถที่คุณค้นหา
          </p>
        )}
      </div>
      </div>

      {/* แถบนำทาง */}
      <div className="navbar3">
        <button className="nav3-button" onClick={() => navigate('/dashboard')}>
          <img className="icons" src="homes.png" alt="" />
        </button>
        <button className="nav3-button" onClick={() => navigate('/findpark')}>
          <img className="icons" src="search.png" alt="" />
        </button>
        <button className="nav3-button active">
          <img className="scan" src="scan.png" alt="" />
        </button>
        <button className="nav3-button">
          <img className="icons" src="recent.png" alt="" />
        </button>
        <button className="nav3-button" onClick={() => navigate('/visualp')}>
          <img className="icons" src="userpro.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Changeq;
