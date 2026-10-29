import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/inter';
import './index.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ParkingProvider } from './context/ParkingContext';

import LoginPage from './Login/Login';
import SignupPage from './Signuppages/Signup';
import DashboardPage from './pages/DashboardPage';
import FindParkPage from './pages/FindParkPage';
import ParkingTimerPage from './pages/ParkingTimerPage';
import PaymentPage from './pages/PaymentPage';
import BookingPage from './pages/BookingPage';
import VehiclesPage from './pages/VehiclesPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <ParkingProvider>
      <Router>
        <Routes>
          {/* Main New App Routes */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/findpark" element={<FindParkPage />} />
          <Route path="/parking-timer" element={<ParkingTimerPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Backward compatibility aliases */}
          <Route path="/Dashboard" element={<DashboardPage />} />
          <Route path="/dashboardv" element={<DashboardPage />} />
          <Route path="/DashboardV" element={<DashboardPage />} />
          <Route path="/Findpark" element={<FindParkPage />} />
          <Route path="/findparkm" element={<FindParkPage />} />
          <Route path="/Findparkm" element={<FindParkPage />} />
          <Route path="/parking" element={<ParkingTimerPage />} />
          <Route path="/Parking" element={<ParkingTimerPage />} />
          <Route path="/paymentsp" element={<PaymentPage />} />
          <Route path="/Paymentsp" element={<PaymentPage />} />
          <Route path="/paymentoptions" element={<PaymentPage />} />
          <Route path="/PaymentOptions" element={<PaymentPage />} />
          <Route path="/paymentsuccess" element={<PaymentPage />} />
          <Route path="/PaymentSuccess" element={<PaymentPage />} />
          <Route path="/bookingform" element={<BookingPage />} />
          <Route path="/BookingForm" element={<BookingPage />} />
          <Route path="/managevehicles" element={<VehiclesPage />} />
          <Route path="/ManageVehicles" element={<VehiclesPage />} />
          <Route path="/recent" element={<HistoryPage />} />
          <Route path="/Recent" element={<HistoryPage />} />
          <Route path="/recentv" element={<HistoryPage />} />
          <Route path="/Recentv" element={<HistoryPage />} />
          <Route path="/historypayment" element={<HistoryPage />} />
          <Route path="/Historypayment" element={<HistoryPage />} />
          <Route path="/historypaymentv" element={<HistoryPage />} />
          <Route path="/Historypaymentv" element={<HistoryPage />} />
          <Route path="/usersettings" element={<ProfilePage />} />
          <Route path="/UserSettings" element={<ProfilePage />} />
          <Route path="/usersettingsm" element={<ProfilePage />} />
          <Route path="/UserSettingsm" element={<ProfilePage />} />
          <Route path="/visualp" element={<ProfilePage />} />
          <Route path="/VisualP" element={<ProfilePage />} />
          <Route path="/visualp2" element={<ProfilePage />} />
          <Route path="/VisualP2" element={<ProfilePage />} />
          <Route path="/visualv" element={<ProfilePage />} />
          <Route path="/Visualv" element={<ProfilePage />} />
          <Route path="/changeq" element={<VehiclesPage />} />
          <Route path="/Changeq" element={<VehiclesPage />} />
          <Route path="/qrscan" element={<ParkingTimerPage />} />
          <Route path="/Qrscan" element={<ParkingTimerPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ParkingProvider>
  );
}

export default App;
