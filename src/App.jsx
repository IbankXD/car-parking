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
      <Router basename={import.meta.env.BASE_URL}>
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

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ParkingProvider>
  );
}

export default App;
