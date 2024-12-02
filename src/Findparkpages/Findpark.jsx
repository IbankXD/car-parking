
import './Findpark.css';
import { useNavigate } from 'react-router-dom';

function Findpark() {
    const navigate = useNavigate();
    function showAlert() {
        alert("ไม่พบข้อมูลการนำทาง");
    }

    return (
        <div className="wallpaper3">


            {/* แนะนํา + สภาพอากาศ */}
            <div className='recomm'>
                {/* <h1>weedasd</h1> */}
                <div className='thunder'><img style={{ width: "23px", height: "23px" }} src="thunders.png" alt="" /></div>
                <div className='celcius'><h3 style={{ fontSize: "22px" }}> <b> 29 </b>° C</h3></div>
                <div className='thunderinfo'> <p style={{ fontSize: "8px" }}> พายุฝนฟ้าคะนอง </p></div>
                <div className='danger'><h4 style={{ fontSize: "12px", color: "red" }}>โปรดหลีกเลี่ยงการจอดรถกลางแจ้ง</h4></div>
                <div className='dangerrec'><p style={{ fontSize: "8px" }}>คำแนะนำ : อาคารจอดรถ 1 &nbsp;&nbsp;&nbsp;ที่ว่าง  30 / 100 คัน</p></div>
                <div className='dangerrec1'><p style={{ fontSize: "8px" }}>คำแนะนำ : อาคารจอดรถ 2 &nbsp;&nbsp;&nbsp;ที่ว่าง  50 / 100 คัน</p></div>

            </div>
            {/* ------------------------------- */}


            {/* ลานจอดกลางแจ้ง */}
            <div className='gangjank'>
                <h1 style={{ fontSize: "25px" }}> <b>ลานจอดกลางแจ้ง &nbsp;
                    <span><img src="sun.png" alt="" style={{ width: "30px", height: "30px" }} /></span></b>
                </h1>

                <div className='land1'>
                    <img className='imggj1' src="gangjank1.png" alt="" style={{ width: "180px", height: "107.5px", }} />
                    <div className=' landinfo'> <b> <p style={{ fontSize: "15px" }}>ลานจอดกลางแจ้ง 1</p></b></div>
                    <div className=' landinfo1'>  <p style={{ fontSize: "10px" }}>ที่ว่าง  : 60 / 100 คัน</p></div>
                    <div className=' landinfo2'>  <p style={{ fontSize: "10px" }}>สถาณะ  : ว่างมาก</p></div>
                    <div><button onClick={() => showAlert()}
                        className='land1btn' style={{ width: "70px", height: "30px", fontSize: "10px", }}>นำทาง</button></div>


                </div>

                <div className='land2'>
                    <img className='imggj1' src="gangjank2.png" alt="" style={{ width: "180px", height: "107.5px", }} />
                    <div className=' landinfo'> <b> <p style={{ fontSize: "15px" }}>ลานจอดกลางแจ้ง 2</p></b></div>
                    <div className=' landinfo1'>  <p style={{ fontSize: "10px" }}>ที่ว่าง  : 60 / 100 คัน</p></div>
                    <div className=' landinfo2'>  <p style={{ fontSize: "10px" }}>สถาณะ  : ว่างมาก</p></div>
                    <div><button onClick={() => showAlert()}
                        className='land1btn' style={{ width: "70px", height: "30px", fontSize: "10px", }}>นำทาง</button></div>

                </div>
            </div>
            {/* ------------------------------- */}


            {/* อาคารจอดรถ */}
            <div className='arkarn'>
                <h1 style={{ fontSize: "25px" }}> <b>อาคารจอดรถ &nbsp;
                    <span><img src="arkarns.png" alt="" style={{ width: "28px", height: "28px" }} /></span></b>
                </h1>

                <div className='land3'>
                    <img className='imggj1' src="arkarnjod1.png" alt="" style={{ width: "180px", height: "107.5px", }} />
                    <div className=' landinfo'> <b> <p style={{ fontSize: "15px" }}>&nbsp;&nbsp;อาคารจอดรถ 1</p></b></div>
                    <div className=' landinfo1'>  <p style={{ fontSize: "10px" }}>ที่ว่าง  : 60 / 100 คัน</p></div>
                    <div className=' landinfo2'>  <p style={{ fontSize: "10px" }}>สถาณะ  : ว่างมาก</p></div>
                    <div><button onClick={() => showAlert()}
                        className='land1btn' style={{ width: "70px", height: "30px", fontSize: "10px", }}>นำทาง</button></div>

                </div>

                <div className='land4'>
                    <img className='imggj1' src="arkarnjod2.png" alt="" style={{ width: "180px", height: "107.5px", }} />
                    <div className=' landinfo'> <b> <p style={{ fontSize: "15px" }}>&nbsp;&nbsp;อาคารจอดรถ 2</p></b></div>
                    <div className=' landinfo1'>  <p style={{ fontSize: "10px" }}>ที่ว่าง  : 60 / 100 คัน</p></div>
                    <div className=' landinfo2'>  <p style={{ fontSize: "10px" }}>สถาณะ  : ว่างมาก</p></div>
                    <div><button onClick={() => showAlert()}
                        className='land1btn' style={{ width: "70px", height: "30px", fontSize: "10px", }}>นำทาง</button></div>

                </div>
            </div>
            {/* ------------------------------- */}


            <div className="navbar2">
                <button className="nav2-button" onClick={() => navigate('/dashboard')}>
                    <img className='icons' src="homes.png" alt="" />
                </button>
                <button className="nav2-button" onClick={() => navigate('/findpark')}>
                    <img className='icons' src="search.png" alt="" />
                </button>
                <button className="nav2-button active">
                    <img className='scan' src="scan.png" alt="" />
                </button>
                <button className="nav2-button" onClick={() => navigate('/recent')}>
                    <img className='icons' src="recent.png" alt="" />
                </button>
                <button className="nav2-button" onClick={() => navigate('/visualp')}>
                    <img className='icons' src="userpro.png" alt="" />
                </button>
            </div>
            <img className='userbanks1' src="Userbank.jpg" alt="" />
            <div className='userinfo1'> <p style={{ fontSize: "10px" }}>Siwat Kaewnongsung</p></div>
            <div className='userinfo2'> <p style={{ fontSize: "9px" }}>USER : MT-xxxxx09</p></div>

            <div className='notify-find'><button style={{ backgroundColor: "transparent", border: "none", }} >
                <span><img style={{ width: "17px", height: "19px" }} src="notify.png" alt="" /></span></button></div>
            <div className='setting-find'><button style={{ backgroundColor: "transparent", border: "none", }} >
                <span><img style={{ width: "19px", height: "19px" }} src="Settings.png" alt="" /></span></button></div>
        </div>
    );
}

export default Findpark;