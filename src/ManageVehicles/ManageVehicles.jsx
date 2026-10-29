import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageVehicles.css";

const DEFAULT_PLATES = ['กก 1234', 'ขข 5678'];

const ManageVehicles = () => {
    const [plates, setPlates] = useState(() => {
        try {
            const saved = localStorage.getItem('user_plates');
            return saved ? JSON.parse(saved) : DEFAULT_PLATES;
        } catch {
            return DEFAULT_PLATES;
        }
    });

    const [toggles, setToggles] = useState(() => {
        try {
            const saved = localStorage.getItem('user_plate_toggles');
            return saved ? JSON.parse(saved) : [true, false];
        } catch {
            return [true, false];
        }
    });

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('user_plates', JSON.stringify(plates));
        localStorage.setItem('user_plate_toggles', JSON.stringify(toggles));
    }, [plates, toggles]);

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
        const trimmed = input.trim();
        if (!trimmed) {
            alert("กรุณากรอกทะเบียนรถ");
            return;
        }

        setPlates([...plates, trimmed]);
        setToggles([...toggles, false]);
        setInput("");
    };

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
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                    <img style={{ width: "120px", height: "120px" }} src="/logo.png" alt="Logo" />
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
                                    checked={Boolean(toggles[index])}
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
                            <img className='icons' src="/homes.png" alt="Home" />
                        </button>
                        <button className="nav-button" onClick={() => navigate('/findpark')}>
                            <img className='icons' src="/search.png" alt="Search" />
                        </button>
                        <button className="nav-button active" onClick={() => navigate('/parking')}>
                            <img className='scan' src="/scan.png" alt="Scan" />
                        </button>
                        <button className="nav-button" onClick={() => navigate('/recent')}>
                            <img className='icons' src="/recent.png" alt="Recent" />
                        </button>
                        <button className="nav-button" onClick={() => navigate('/visualp')}>
                            <img className='icons' src="/userpro.png" alt="Profile" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageVehicles;
