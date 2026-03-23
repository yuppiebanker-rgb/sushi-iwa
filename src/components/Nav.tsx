import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <div className="nav__inner container">
        <Link to="/" className="nav__logo" aria-label="Sushi IWA Home">
          <span className="nav__logo-jp">岩</span>
          <span className="nav__logo-text">SUSHI IWA</span>
        </Link>

        <button
          className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          <li><Link to="/" className={pathname === '/' ? 'active' : ''} onClick={() => setOpen(false)}>Inicio</Link></li>
          <li><Link to="/menu" className={pathname === '/menu' ? 'active' : ''} onClick={() => setOpen(false)}>Carta</Link></li>
          <li><a href="https://wa.me/5216141234567" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Reservar</a></li>
        </ul>
      </div>
    </nav>
  );
}
