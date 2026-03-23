import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <div className="footer-brand-name">SUSHI IWA</div>
          <div className="footer-brand-jp">い わ</div>
          <p className="footer-tagline">
            Cocina japonesa de autor en el corazón de San Pedro Garza García, Monterrey. いわ.
          </p>
        </div>
        <div className="footer-col">
          <h4>Navegación</h4>
          <Link to="/menu">Menú</Link>
          <a href="#nosotros">Nosotros</a>
          <a href="#ubicaciones">Ubicaciones</a>
          <a href="#reservar">Reservaciones</a>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <a href="https://instagram.com/sushi.iwa" target="_blank" rel="noopener noreferrer">@sushi.iwa</a>
          <a href="tel:+528111239849">+52 81 1123 9849</a>
          <a href="https://wa.me/528111239849" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:sushi.iwa@hotmail.com">sushi.iwa@hotmail.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sushi IWA. Todos los derechos reservados.</p>
        <div className="socials">
          <a className="social" href="https://instagram.com/sushi.iwa" target="_blank" rel="noopener noreferrer">IG</a>
          <a className="social" href="https://wa.me/528111239849" target="_blank" rel="noopener noreferrer">WA</a>
          <a className="social" href="https://facebook.com/sushi.iwa" target="_blank" rel="noopener noreferrer">FB</a>
        </div>
      </div>
    </footer>
  );
}
