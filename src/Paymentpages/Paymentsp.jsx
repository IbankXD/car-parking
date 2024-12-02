import './Paymentsp.css';
import { useNavigate } from 'react-router-dom';
function Paymentsp() {
    const navigate = useNavigate();
    return (
        <div className="wallpaper10">
            <div className='yodchumla'>
            </div>
            <div className='reciep-num'>
                <h5 style={{ fontSize: "19px", marginLeft: "1.4rem", color: "#3f3f3f" }}>หมายเลขใบเสร็จ : 00234</h5>
            </div>
            <h1 className='title-payment' style={{ fontSize: "20px" }}> <b> ข้อมูลการเข้าจอด</b></h1>
            <div className='payment-user'>
                <h2 style={{ fontSize: "15px", marginLeft: "5rem", marginTop: "4.8rem", color: "#000" }}> <b> USER : 096-xxx-x632 </b></h2>
                <p style={{ fontSize: "12px", marginLeft: "5rem", color: "#3f3f3f" }}>TYPE : MEMBER</p>
            </div>
            <div className='payment-info'>
                <p>
                    <strong>วันที่ / เวลาเข้าจอด :</strong> 1 / 11 / 2567 - 09:00
                </p>
                <p>
                    <strong>วันที่ / เวลาออก :</strong> 1 / 11 / 2567 - 19:00
                </p>
                <p>
                    <strong>สถานที่จอดรถ :</strong> ลานจอดกลางแจ้ง 1
                </p>
                <p>
                    <strong>จำนวนชั่วโมง :</strong> 02 : 54
                </p>
                <p>
                    <strong>สิทธิส่วนลด :</strong> ตลอดวัน
                </p>
            </div>
            <div style={{ marginTop: "2.8rem", fontSize: "16px", marginLeft: "2.4rem", color: "#3f3f3f" }}>
                <p>
                    <strong>ค่าบริการ:</strong> 30.00 บาท
                </p>

            </div>
            <div className='yodchumla1'>
                <h4 style={{ fontSize: "15px", marginLeft: "1.4rem", color: "#fff" }}> ยอดชําระ </h4>
                <p style={{ fontSize: "8px", marginLeft: "1.4rem", color: "#fff" }}>TOTAL AMOUNT</p>
            </div>
            <div className='yodchumla2'>
                <h4 style={{ fontSize: "15px", marginLeft: "1.4rem", color: "#fff" }}> 30.00 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; บาท </h4>
            </div>

            <div className='btn-pay-container' onClick={() => navigate('/paymentoptions')} >
                <button className='btn-pay'>ชำระเงิน</button>
            </div>

            <div className="backbtn-back2">
                <button className='backbtn2 bi bi-arrow-left' style={{ width: "65px", height: "65px", borderRadius: "50%" }} onClick={() => navigate(-1)}></button>
            </div>
        </div>
    );
}

export default Paymentsp;