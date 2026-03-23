import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <nav className="nav">
      <Link className="logo" to="/">
        <span className="logo-en">SUSHI IWA</span>
        <span className="logo-jp">い わ</span>
      </Link>

      <ul className="nav-links">
        {isHome ? (
          <>
            <li><a href="#menu">Menú</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#ubicaciones">Ubicaciones</a></li>
            <li><a href="#reservar">Reservaciones</a></li>
          </>
        ) : (
          <>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/ubicaciones">Ubicaciones</Link></li>
            <li><Link to="/galeria">Galería</Link></li>
          </>
        )}
      </ul>

      {isHome ? (
        <button className="nav-cta" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
          Reservar
        </button>
      ) : (
        <Link className="nav-cta" to="/#reservar">Reservar</Link>
      )}
    </nav>
  );
}
