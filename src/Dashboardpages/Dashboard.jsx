import React from 'react';
import './dashboard.css';

import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const navigate = useNavigate();


    return (
        <div className='wallpaper2'>
            <div className='profile'>
                <div className='celcius-dash'><h3 style={{ fontSize: "27px" }}>  29 </h3><p style={{ fontSize: "15px" }}>°C</p></div>
                <div className='thunderinfo-dash'> <p style={{ fontSize: "8px" }}> พายุฝนฟ้าคะนอง </p></div>
                <div className='thunder-dash'><img style={{ width: "25px", height: "25px" }} src="thunders.png" alt="" /></div>

            </div>
            <div className='dashboard-content' >
                {/* main menu */}
                <div className='mainmenu'>
                    <h4><b>MAIN MENU <span className='bi bi-list'></span></b></h4>
                </div>
                <div className='btn-container'>


                    <button className='btnm' onClick={() => navigate('/findpark')}>
                        <span className='bi bi-search'></span>
                    </button>


                    <button className='btnm' onClick={() => navigate('/paymentsp')}>
                        <span className='bi bi-file-earmark-text'></span>
                    </button>
                    <button className='btnm' onClick={() => navigate('/recent')}>
                        <span className='bi bi-clock-history'></span>
                    </button>
                    <button className='btnm' onClick={() => navigate('/bookingform')}>
                        <span className='bi bi-calendar'></span>
                    </button>
                    <button className='btnm' onClick={() => navigate('/parking')}>
                        <span className='bi bi-chat-dots'></span>
                    </button>
                </div>

                <div className="menu-bar">
                    <div className="menu-item">
                        <span>ดูลานจอด</span>
                    </div>
                    <div className="menu-item">
                        <span>ใบเสร็จ</span>
                    </div>
                    <div className="menu-item">
                        <span>ประวัติ</span>
                    </div>
                    <div className="menu-item">
                        <span>การนัดหมาย</span>
                    </div>
                    <div className="menu-item">
                        <span>การเข้าจอด</span>
                    </div>
                </div>
                {/* ------------------------------------------- */}


                {/* ai function */}
                <div className='aigen'>
                    <h4><b>การคาดการณ์ <span
                        className='bi bi-chat-left'></span></b></h4>
                    <div className='aiback'>
                        <input type="date" className='date' placeholder='กรอกวันที่และเวลาที่ต้องการ' />
                    </div>
                    <img className='cloud' src="clouds.png" alt="" />
                    <div className='aiback2'>
                        <input type="text" className='notiai' placeholder='loading......pleasewait' disabled />
                    </div>

                </div>
                {/* ------------------------------------------- */}


                {/* การนัดหมาย */}
                <div className='ticket'>
                    <h4><b>การนัดหมาย <span className='bi bi-pin-angle-fill'></span></b></h4>
                    <img className='tick' src="tickets.png" alt="" />
                    <div className='tick-cal2'>
                    </div>
                    <div className='tick-cal'>
                        <img className='qrcode-dashdash' style={{ width: "80px", height: "80px" }} src="QRCODESC.png" alt="" />
                    </div>
                </div>
                {/* ------------------------------------------- */}



                <img className='user-dash' src="Userbank.jpg" alt="" />
                <div className='info-dash'>
                    <h4 style={{ fontSize: '15px' }}>WELCOME BACK</h4>
                    <div className='info-dash1'>
                        <p style={{ fontSize: '10px' }}>USER : 096-XXX-XX22</p>
                        <p style={{ fontSize: '10px' }}>TYPE : MEMBER</p>
                    </div>
                </div>

                <div className='setnoti-dash'>
                    <div className='setting-dash'><button onClick={() => navigate('/usersettingsm')} style={{ backgroundColor: "transparent", border: "none", }} >
                        <span><img style={{ width: "19px", height: "19px" }} src="Settings.png" alt="" /></span></button></div>
                    <div className='notify-dash'><button style={{ backgroundColor: "transparent", border: "none", }} >
                        <span><img style={{ width: "17px", height: "19px" }} src="notify.png" alt="" /></span></button></div>
                </div>

                <div className='footer-dash'>
                <div className="navbar">
                <button className="nav-button" onClick={() => navigate('/dashboard')}>
                <img className='icons' src="homes.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/findpark')}>
                <img className='icons' src="search.png" alt="" />
                </button>
                <button className="nav-button active">
                <img className='scan' src="scan.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/recent')}>
                <img className='icons' src="recent.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/visualp')}>
                <img className='icons' src="userpro.png" alt="" />
                </button>
                </div>
                </div>

            </div>
                {/* <div className='btn-tick-dash'>
                    <button className='btn-tick'>
                        <p style={{ fontSize: '9px' }} >เพิ่มเติม<span className='bi bi-plus'></span></p>
                    </button>
                </div> */}
                <div className='tick-cal-info'>
                <p style={{ fontSize: '15px' }}> <b> นัดหมายแล้ว </b></p>
                <p>15 ธ.ค 2567 &nbsp;&nbsp; 12 : 00 น.</p>
                </div>
        </div>

    );
}

export default Dashboard;