import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './StaffNav.css';

const NAV_ITEMS = [
  { to: '/iwa-staff/dashboard',    label: 'Dashboard',     icon: '▦' },
  { to: '/iwa-staff/waitlist',     label: 'Waitlist',      icon: '⏱' },
  { to: '/iwa-staff/floor',        label: 'Piso',          icon: '⊞' },
  { to: '/iwa-staff/reservations', label: 'Reservaciones', icon: '📅' },
  { to: '/iwa-staff/86',           label: '86 Board',      icon: '⊘' },
  { to: '/iwa-staff/analytics',    label: 'Analíticas',    icon: '📊' },
  { to: '/iwa-staff/board',        label: 'Board',         icon: '💬' },
  { to: '/iwa-staff/qr',           label: 'QR Codes',      icon: '⬚' },
  { to: '/iwa-staff/reviews',      label: 'Reseñas',       icon: '★' },
];

const MOBILE_MAIN = NAV_ITEMS.slice(0, 4);

export default function StaffNav() {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const logout = () => {
    sessionStorage.removeItem('isStaffAuth');
    navigate('/iwa-staff');
  };

  const eightySixCount = (() => {
    try {
      const locId = localStorage.getItem('iwa_staff_location') || 'mty';
      const d = JSON.parse(localStorage.getItem(`iwa-86-${locId}`) || '{}');
      return Object.values(d).filter(Boolean).length;
    } catch { return 0; }
  })();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="snav">
        <div className="snav-logo">
          <span className="snav-jp">岩</span>
          <span className="snav-txt">STAFF</span>
        </div>
        <nav className="snav-links">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to} to={item.to}
              className={({ isActive }) => `snav-link ${isActive ? 'snav-link--active' : ''}`}
            >
              <span className="snav-icon">{item.icon}</span>
              {item.label}
              {item.label === '86 Board' && eightySixCount > 0 && (
                <span className="snav-badge">{eightySixCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="snav-bottom">
          <a className="snav-link" href="/" target="_blank" rel="noopener noreferrer">
            <span className="snav-icon">←</span> Ver sitio
          </a>
          <button className="snav-link snav-logout" onClick={logout}>
            <span className="snav-icon">⏻</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM TABS */}
      <div className="snav-mobile">
        {MOBILE_MAIN.map(item => (
          <NavLink
            key={item.to} to={item.to}
            className={({ isActive }) => `snav-tab ${isActive ? 'snav-tab--active' : ''}`}
          >
            <span className="snav-tab-icon">{item.icon}</span>
            <span className="snav-tab-label">{item.label}</span>
          </NavLink>
        ))}
        <button className={`snav-tab ${moreOpen ? 'snav-tab--active' : ''}`} onClick={() => setMoreOpen(!moreOpen)}>
          <span className="snav-tab-icon">⋯</span>
          <span className="snav-tab-label">Más</span>
        </button>
        {moreOpen && (
          <div className="snav-more-menu" onClick={() => setMoreOpen(false)}>
            {NAV_ITEMS.slice(4).map(item => (
              <NavLink key={item.to} to={item.to} className="snav-more-item">
                <span>{item.icon}</span> {item.label}
              </NavLink>
            ))}
            <button className="snav-more-item" onClick={logout}>
              <span>⏻</span> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </>
  );
}
