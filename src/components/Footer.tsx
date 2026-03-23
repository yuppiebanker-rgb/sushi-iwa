import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__jp">岩</span>
          <span className="footer__name">SUSHI IWA</span>
          <p className="footer__tagline">Cocina Japonesa · Chihuahua</p>
        </div>

        <nav className="footer__nav">
          <Link to="/">Inicio</Link>
          <Link to="/menu">Carta</Link>
          <a href="https://wa.me/5216141234567" target="_blank" rel="noopener noreferrer">Reservar</a>
        </nav>

        <div className="footer__info">
          <p>Periférico de la Juventud 6103, Chihuahua</p>
          <p>Mar–Dom · 13:00 – 22:00</p>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Sushi IWA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
