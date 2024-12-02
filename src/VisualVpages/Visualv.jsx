import './Visualv.css';
import { useNavigate } from 'react-router-dom';

function Visualv() {
    const navigate = useNavigate();
    return (
        <div className='wallpaper6'>
            <div className='visualv-card'>
                <img className='visit-card' src="visitvi.png" alt="" />
            </div>
            <div className='space-visit'>
                <h1></h1>
            </div>


            <div className="navbar">
            <button className="nav-button" onClick={() => navigate('/dashboardv')}>
                <img className='icons' src="homes.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/findparkm')}>
                <img className='icons' src="search.png" alt="" />
                </button>
                <button className="nav-button active">
                <img className='scan' src="scan.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/recentv')}>
                <img className='icons' src="recent.png" alt="" />
                </button>
                <button className="nav-button" onClick={() => navigate('/visualv')}>
                <img className='icons' src="userpro.png" alt="" />
                </button>
                <div className='info-visit'>
                    <p>ชื่อ : ศิวัฒน์ แก้วหนองสังข์</p>
                    <p>เบอร์ : 0969862172</p>
                    <p>TYPE : VISITOR</p>
                </div>
            </div>
            <img className='userbanks-visit' src="Userbank.jpg" alt="" />
        </div>
    );
}

export default Visualv;