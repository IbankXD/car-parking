
import './visualP.css';
import { useNavigate } from 'react-router-dom';
function VisualP() {
    const navigate = useNavigate();
    return (
        <div className='wallpaper4'>


            <div className='visual-card'>
                <img className='vcards' src="Vcards.png" alt="" />
            </div>



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
                <div className='info'>
                    <p>ชื่อ : ศิวัฒน์ แก้วหนองสังข์</p>
                    <p>รหัสพนักงาน : MT - 66026188</p>
                    <p>เบอร์ : 0969862172</p>
                    <p>TYPE : MEMBER</p>
                </div>
            </div>

            <div className='platename-visual'>
                <p>กนพ3344</p>
            </div>
            <img className='userbanks' src="Userbank.jpg" alt="" />
            <div className='change-visual'><button onClick={() => navigate('/changeq')} className='change-btnvisual' style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#fd6e2b" }}><img style={{ width: "30px", height: "30px" }} src="changes.png" alt="" /></button></div>
        </div>
    );
}

export default VisualP;