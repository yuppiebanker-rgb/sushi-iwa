import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import StaffGuard from './components/staff/StaffGuard';
import PageTransition from './components/PageTransition';
import IntroScreen from './components/IntroScreen';
import './styles/tokens.css';
import './styles/micro-interactions.css';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollProgress from './components/ScrollProgress';
import './styles/accessibility.css';

// Loading fallback — minimal, branded
const PageLoader = () => (
  <div style={{
    minHeight: '100vh', background: '#0c0b09',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}>
    <div style={{
      fontFamily: '"Noto Serif JP", serif',
      fontSize: '28px', color: '#b8922a', opacity: 0.6,
      animation: 'pulse 1.8s ease-in-out infinite'
    }}>いわ</div>
    <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.9}}`}</style>
  </div>
);

// Lazy load ALL pages
const Home       = lazy(() => import('./pages/Home'));
const Menu       = lazy(() => import('./pages/Menu'));
const Locations  = lazy(() => import('./pages/Locations'));
const Gallery    = lazy(() => import('./pages/Gallery'));
const Events     = lazy(() => import('./pages/Events'));
const ChefStory  = lazy(() => import('./pages/ChefStory'));
const GiftCards  = lazy(() => import('./pages/GiftCards'));
const Loyalty    = lazy(() => import('./pages/Loyalty'));
const Newsletter = lazy(() => import('./pages/Newsletter'));

// Staff portal — heaviest chunk, load separately
const StaffLogin     = lazy(() => import('./pages/staff/StaffLogin'));
const StaffDash      = lazy(() => import('./pages/staff/Dashboard'));
const StaffWaitlist  = lazy(() => import('./pages/staff/Waitlist'));
const StaffFloor     = lazy(() => import('./pages/staff/FloorMap'));
const StaffRes       = lazy(() => import('./pages/staff/Reservations'));
const Staff86        = lazy(() => import('./pages/staff/EightyBoard'));
const StaffAnalytics = lazy(() => import('./pages/staff/Analytics'));
const StaffBoard     = lazy(() => import('./pages/staff/StaffBoard'));
const StaffQR        = lazy(() => import('./pages/staff/QRGenerator'));
const StaffReviews   = lazy(() => import('./pages/staff/ReviewAssistant'));

function AppShell() {
  const { pathname } = useLocation();
  const isStaff = pathname.startsWith('/iwa-staff');

  if (isStaff) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/iwa-staff" element={<StaffLogin />} />
          <Route element={<StaffGuard />}>
            <Route path="/iwa-staff/dashboard" element={<StaffDash />} />
            <Route path="/iwa-staff/waitlist" element={<StaffWaitlist />} />
            <Route path="/iwa-staff/floor" element={<StaffFloor />} />
            <Route path="/iwa-staff/reservations" element={<StaffRes />} />
            <Route path="/iwa-staff/86" element={<Staff86 />} />
            <Route path="/iwa-staff/analytics" element={<StaffAnalytics />} />
            <Route path="/iwa-staff/board" element={<StaffBoard />} />
            <Route path="/iwa-staff/qr" element={<StaffQR />} />
            <Route path="/iwa-staff/reviews" element={<StaffReviews />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <IntroScreen />
      <PageTransition />
      <Nav />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ubicaciones" element={<Locations />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/chef" element={<ChefStory />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/regalo" element={<GiftCards />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/novedades" element={<Newsletter />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppWidget />
      <ScrollProgress />
    </>
  );
}

export default function App() {
  return <AppShell />;
}
