import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Gallery from './pages/Gallery';
import StaffLogin from './pages/staff/StaffLogin';
import StaffGuard from './components/staff/StaffGuard';
import Dashboard from './pages/staff/Dashboard';
import Waitlist from './pages/staff/Waitlist';
import FloorMap from './pages/staff/FloorMap';
import Reservations from './pages/staff/Reservations';
import EightyBoard from './pages/staff/EightyBoard';
import Analytics from './pages/staff/Analytics';
import StaffBoard from './pages/staff/StaffBoard';
import QRGenerator from './pages/staff/QRGenerator';
import ReviewAssistant from './pages/staff/ReviewAssistant';
import './styles/tokens.css';

function AppShell() {
  const { pathname } = useLocation();
  const isStaff = pathname.startsWith('/iwa-staff');

  if (isStaff) {
    return (
      <Routes>
        <Route path="/iwa-staff" element={<StaffLogin />} />
        <Route element={<StaffGuard />}>
          <Route path="/iwa-staff/dashboard" element={<Dashboard />} />
          <Route path="/iwa-staff/waitlist" element={<Waitlist />} />
          <Route path="/iwa-staff/floor" element={<FloorMap />} />
          <Route path="/iwa-staff/reservations" element={<Reservations />} />
          <Route path="/iwa-staff/86" element={<EightyBoard />} />
          <Route path="/iwa-staff/analytics" element={<Analytics />} />
          <Route path="/iwa-staff/board" element={<StaffBoard />} />
          <Route path="/iwa-staff/qr" element={<QRGenerator />} />
          <Route path="/iwa-staff/reviews" element={<ReviewAssistant />} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/ubicaciones" element={<Locations />} />
        <Route path="/galeria" element={<Gallery />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return <AppShell />;
}
