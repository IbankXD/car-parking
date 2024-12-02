import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Parking.css';

function Parking() {
    const navigate = useNavigate();
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const nextSeconds = (prevTime.seconds + 1) % 60;
                const nextMinutes = nextSeconds === 0 ? (prevTime.minutes + 1) % 60 : prevTime.minutes;
                const nextHours = nextMinutes === 0 && nextSeconds === 0 ? (prevTime.hours + 1) % 24 : prevTime.hours;

                return {
                    hours: nextHours,
                    minutes: nextMinutes,
                    seconds: nextSeconds,
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const createCircleStyle = (value, maxValue) => ({
        strokeDasharray: `${(value / maxValue) * 283} 283`, // เส้นรอบวงของวงกลม
        strokeDashoffset: 0,
    });

    return (
        <div className="settings-container">
            <div className="wallpaper20">
                <div className="profile-card2">
                    <img
                        src="./User.jpg"
                        alt="Profile"
                        className="profile-image2"
                    />
                    <div className="profile-details">
                        <div className='profile-info'>
                            <p style={{ marginTop: "19px" }} className="profile-name">ศิวัฒน์ แก้วหนองสังข์</p>
                            <p className="profile-type">TYPE:---</p>
                            <p style={{ marginLeft: "2px" }} className="profile-info">เบอร์โทร: 096-xxx-2172</p>
                        </div>
                    </div>
                </div>
                <div className="parking-form">
                    <div className='recent-content2'><br />
                        <p style={{ marginTop: "0.4rem", marginLeft: "1rem" }}>TYPE : MEMBER</p>
                        <p style={{ marginLeft: "1rem" }}>สถานที่ : ลานจอดกลางแจ้ง 1</p>
                        <p style={{ marginLeft: "1rem" }}>วันที่ : 1 / 11 / 2567</p>
                        <p style={{ marginLeft: "1rem" }}>ทะเบียนรถ : กก 1234</p>
                        <img className='img-recent-car' src="Car.png" alt="" />

                        <div className="timer-container">
                            <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
                                {["hours", "minutes", "seconds"].map((unit, index) => (
                                    <div key={index} style={{ textAlign: "center" }}>
                                        <svg width="60" height="60">
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="25"
                                                stroke="#333"
                                                strokeWidth="5"
                                                fill="none"
                                            />
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="25"
                                                stroke={["#FD6e2b", "#FD6e2b", "#FD6e2b"][index]}
                                                strokeWidth="5"
                                                fill="none"
                                                style={{
                                                    ...createCircleStyle(time[unit], { hours: 24, minutes: 60, seconds: 60 }[unit]),
                                                    transformOrigin: "center",
                                                    transform: "rotate(-90deg)",
                                                    transformBox: "fill-box",
                                                }}
                                            />
                                        </svg>
                                        <div style={{ color: "#fff", marginTop: "5px" }}>
                                            <h4 style={{ margin: 0 }}>{time[unit]}</h4>
                                            <p style={{ fontSize: "10px", margin: 0 }}>{unit.toUpperCase()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='recent-content2'><br />
                        <p style={{ marginTop: "0.4rem", marginLeft: "1rem" }}>TYPE : VISITOR</p>
                        <p style={{ marginLeft: "1rem" }}>สถานที่ : ลานจอดกลางแจ้ง 1</p>
                        <p style={{ marginLeft: "1rem" }}>วันที่ : 1 / 11 / 2567</p>
                        <p style={{ marginLeft: "1rem" }}>ทะเบียนรถ : กก 1234</p>
                        <img className='img-recent-car' src="Car.png" alt="" />

                        <div className="timer-container">
                            <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
                                {["hours", "minutes", "seconds"].map((unit, index) => (
                                    <div key={index} style={{ textAlign: "center" }}>
                                        <svg width="60" height="60">
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="25"
                                                stroke="#333"
                                                strokeWidth="5"
                                                fill="none"
                                            />
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="25"
                                                stroke={["#FD6e2b", "#FD6e2b", "#FD6e2b"][index]}
                                                strokeWidth="5"
                                                fill="none"
                                                style={{
                                                    ...createCircleStyle(time[unit], { hours: 24, minutes: 60, seconds: 60 }[unit]),
                                                    transformOrigin: "center",
                                                    transform: "rotate(-90deg)",
                                                    transformBox: "fill-box",
                                                }}
                                            />
                                        </svg>
                                        <div style={{ color: "#fff", marginTop: "5px" }}>
                                            <h4 style={{ margin: 0 }}>{time[unit]}</h4>
                                            <p style={{ fontSize: "10px", margin: 0 }}>{unit.toUpperCase()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                    <div className="parking-nav-container">
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
        </div>
    );
}

export default Parking;
