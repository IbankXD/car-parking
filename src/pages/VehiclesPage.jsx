import { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import MobileLayout from '../components/MobileLayout';

export default function VehiclesPage() {
  const { vehicles, addVehicle, toggleVehicleActive, deleteVehicle } = useParking();
  const [newPlate, setNewPlate] = useState('');
  const [province, setProvince] = useState('กรุงเทพฯ');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newPlate.trim();
    if (!trimmed) {
      alert('กรุณากรอกทะเบียนรถ');
      return;
    }
    addVehicle(trimmed, province);
    setNewPlate('');
  };

  const activeCount = vehicles.filter((v) => v.active).length;

  return (
    <MobileLayout>
      <div className="page-vehicles">
        <h2 className="page-heading mb-1">จัดการทะเบียนรถ</h2>
        <p className="text-muted small mb-3">
          เปิดใช้งานพร้อมกันได้สูงสุด 2 คัน (กำลังเปิดใช้งาน {activeCount}/2 คัน)
        </p>

        {/* Add Plate Form */}
        <form onSubmit={handleAdd} className="card p-3 border-0 shadow-sm rounded-4 mb-4">
          <div className="row g-2 align-items-center">
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                placeholder="เลขทะเบียน เช่น กข 9999"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="จังหวัด"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-primary w-100 fw-bold">
                +
              </button>
            </div>
          </div>
        </form>

        {/* Vehicles List */}
        <div className="vehicles-list mb-4">
          <h4 className="fs-6 fw-bold mb-3">รถที่ลงทะเบียนไว้ ({vehicles.length})</h4>

          {vehicles.length === 0 ? (
            <p className="text-muted small text-center py-4 bg-light rounded-4">
              ยังไม่มีทะเบียนรถในระบบ
            </p>
          ) : (
            vehicles.map((v) => (
              <div key={v.id} className="card p-3 border-0 shadow-sm rounded-4 mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="btn btn-link text-danger p-0 fs-5"
                      onClick={() => {
                        if (window.confirm(`ลบทะเบียน ${v.plate}?`)) {
                          deleteVehicle(v.id);
                        }
                      }}
                      title="ลบทะเบียนนี้"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <div>
                      <div className="vehicle-plate-badge">{v.plate}</div>
                      <span className="small text-muted">{v.province}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="small text-muted">
                      {v.active ? (
                        <span className="text-success fw-bold">ใช้งาน</span>
                      ) : (
                        'ปิด'
                      )}
                    </span>
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={v.active}
                        onChange={() => toggleVehicleActive(v.id)}
                        style={{ cursor: 'pointer', width: '2.5rem', height: '1.25rem' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
