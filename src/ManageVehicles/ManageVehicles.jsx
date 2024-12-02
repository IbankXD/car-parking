import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageVehicles.css";

const ManageVehicles = () => {
    const [plates, setPlates] = useState([]); // รายการทะเบียนรถ
    const [toggles, setToggles] = useState([]); // สถานะเปิด/ปิด
    const [input, setInput] = useState(""); // ค่าที่กรอกใน input
    const [selectedPlates, setSelectedPlates] = useState([]); // เก็บค่าของทะเบียนที่เลือกสำหรับลบ

    const navigate = useNavigate();
    const handleToggle = (index) => {
        const activeToggles = toggles.filter((toggle) => toggle).length;

        if (!toggles[index] && activeToggles >= 2) {
            alert("สามารถเปิดได้เพียง 2 อัน กรุณาปิดหนึ่งอันก่อน");
            return;
        }

        const newToggles = [...toggles];
        newToggles[index] = !newToggles[index];
        setToggles(newToggles);
    };

    const handleAddPlate = () => {
        const regex = /^[ก-ฮ0-9]+$/;
        if (!regex.test(input)) {
            alert("กรุณาเพิ่มทะเบียนรถที่เป็นภาษาไทยหรือตัวเลขเท่านั้น");
            return;
        }

        setPlates([...plates, input]);
        setToggles([...toggles, false]);
        setInput("");
    };

    // ฟังก์ชันลบทะเบียนรถ
    const handleDeletePlate = (index) => {
        const confirmed = window.confirm(`คุณต้องการลบทะเบียนรถ "${plates[index]}" ใช่หรือไม่?`);
        if (confirmed) {
            const newPlates = plates.filter((_, i) => i !== index);
            const newToggles = toggles.filter((_, i) => i !== index);

            setPlates(newPlates);
            setToggles(newToggles);
        }
    };
    return (
        <div className="manage-vehicles">

            <div className="wallpaper16">
                <div>
                    <img src="src/assets/images/logo.png" alt="" />
                </div>
                <header className="header2">
                    <div className="input-container2">
                        <input
                            type="text"
                            className="input-vehicle2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="กรอกทะเบียนรถ"
                        />
                    </div>
                    <div className="add-button-containers">
                        <button className="add-button-vehicle" onClick={handleAddPlate}>+</button>
                    </div>
                    
                </header>
                <div className="plate-list">
                    <br /><br /><br />
                    {plates.map((plate, index) => (
                        <div key={index} className="plate-item">
                            <button
                                className="delete-icon"
                                onClick={() => handleDeletePlate(index)}
                            >
                                🗑️
                            </button>
                            <span>{plate}</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={toggles[index]}
                                    onChange={() => handleToggle(index)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    ))}
                    <br />
                </div>
                <div className="manage-footer">
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
                    <button className="nav-button">
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
};

export default ManageVehicles;
