import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const { pathname } = useLocation();
  const isMenu = pathname === '/menu';

  return (
    <nav className="nav">
      <Link className="logo" to="/">
        <span className="logo-en">SUSHI IWA</span>
        <span className="logo-jp">い わ</span>
      </Link>

      {isMenu ? (
        <Link className="nav-back" to="/">Inicio</Link>
      ) : (
        <ul className="nav-links">
          <li><a href="#menu">Menú</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#ubicaciones">Ubicaciones</a></li>
          <li><a href="#reservar">Reservaciones</a></li>
        </ul>
      )}

      {isMenu ? (
        <Link className="nav-cta" to="/#reservar">Reservar</Link>
      ) : (
        <button className="nav-cta" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
          Reservar
        </button>
      )}
    </nav>
  );
}
