import './App.css'
import Signup from './Signuppages/signup'
import Dashboard from './Dashboardpages/Dashboard'
import VisualP from './VisualCpages/VisualP'
import Findpark from './Findparkpages/Findpark';
import Findparkm from './Findparkpagesm/Findparkm';
import Changeq from './ChangeQrpages/Changeq';
import Visualv from './VisualVpages/Visualv';
import BookingForm from './BookingForm/BookingForm';
import UserSettings from './UserSettings/UserSettings';
import UserSettingsm from './UserSettingsm/UserSettingsm';
import Paymentsp from './Paymentpages/Paymentsp';
import PaymentOptions from './Payment/PaymentOptions';
import PaymentSuccess from './PaymentSuccess/PaymentSuccess';
import Qrscan from './QRscanout/Qrscan';
import ManageVehicles from './ManageVehicles/ManageVehicles';
import Loading from './Loadingpages/Loading';
import Login from './Login/Login';
import Recent from './Recentpages/Recent';
import Recentv from './Recentpagesv/Recentv';
import Parking from './Parking/Parking';
import VisualP2 from './VisualCpages2/VisualP2';
import DashboardV from './Dashboardpagesvisit/DashboardV';
import Historypayment from './Historypayment/Historypayment';
import Historypaymentv from './Historypaymentv/Historypaymentv';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/inter'; // Import ฟอนต์ Inter
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



function App() {
  const [isLoading, setIsLoading] = useState(true);

  // จำลองการโหลดด้วย setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // เปลี่ยนสถานะการโหลด
    }, 3000); // 3 วินาที
    return () => clearTimeout(timer); // เคลียร์เมื่อ component ถูก unmount
  }, []);

  if (isLoading) {
    // แสดงหน้าโหลดขณะกำลังโหลด
    return <Loading />;
  }


  return (
    <>

      <Router>
      <Routes>

        <Route path="/" element={<Login />} /> {/* หน้าแรก */}
        <Route path="/Login" element={<Login />} /> 
        <Route path="/DashboardV" element={<DashboardV />} /> 
        <Route path="/VisualP2" element={<VisualP2 />} /> 
        <Route path="/Parking" element={<Parking />} /> 
        <Route path="/Recent" element={<Recent />} /> 
        <Route path="/Recentv" element={<Recentv />} /> 
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Findpark" element={<Findpark />} />
        <Route path="/Findparkm" element={<Findparkm />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/VisualP" element={<VisualP />} />
        <Route path="/Changeq" element={<Changeq />} />
        <Route path="/Visualv" element={<Visualv />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        <Route path="/UserSettings" element={<UserSettings />} />
        <Route path="/UserSettingsm" element={<UserSettingsm />} />
        <Route path="/Paymentsp" element={<Paymentsp />} />
        <Route path="/PaymentOptions" element={<PaymentOptions />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/Qrscan" element={<Qrscan />} />
        <Route path="/ManageVehicles" element={<ManageVehicles />} />
        <Route path="/Historypayment" element={<Historypayment />} />
        <Route path="/Historypaymentv" element={<Historypaymentv />} />


      </Routes>
    </Router>
    </>
  )
}

export default App
