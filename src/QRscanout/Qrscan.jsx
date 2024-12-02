
import './Qrscan.css';
import { useNavigate } from 'react-router-dom';
function Qrscan() {
    const navigate = useNavigate();
    return ( 
        <div className='wallpaper13'>
            <div className='qrscan-card'>
                <img style={{ width: "470px", height: "700px" }} src="Vcards.png" alt="" />
            </div>


            <div className='space-qrscan'>
                <h4 style={{ fontSize: "20px", color: "#473366" }}>
                    สแกนเพื่อออกจากลานจอดรถ
                </h4> 
            </div>
            <div className='space-qrscan1'>
                <h4 style={{ fontSize: "20px" }}>
                    ใช้ได้เพียง 1 ครั้งต่อการเข้าจอด
                </h4> 
            </div>
            <div className='logo-qrscan'>
                <img style={{ width: "180px", height: "180px" }} src="logo.png" alt="" />
            </div>

            <div className='btn-qrscan'>
                <button className='btn-qrscan1' onClick={() => navigate('/dashboard')}>กลับสู่หน้าจอหลัก</button>
            </div>
        </div>
     );
}

export default Qrscan;