import { Link } from 'react-router-dom';
import NewsletterBanner from './NewsletterBanner';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <NewsletterBanner />
      <div className="footer-gold-line" />
      <div className="footer-main">
        {/* Left — Brand */}
        <div className="footer-brand">
          <div className="footer-iwa-giant">いわ</div>
          <div className="footer-brand-name">SUSHI IWA</div>
          <div className="footer-brand-sub">Cocina Japonesa · San Pedro, Monterrey</div>
          <a href="https://sushi-iwa.com" className="footer-brand-url" target="_blank" rel="noopener noreferrer">sushi-iwa.com</a>
        </div>

        {/* Right — 3 sub-columns */}
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Navigate</h4>
            <Link to="/menu">Menú</Link>
            <Link to="/galeria">Galería</Link>
            <Link to="/ubicaciones">Ubicaciones</Link>
            <Link to="/chef">Chef</Link>
            <Link to="/eventos">Eventos</Link>
          </div>
          <div className="footer-col">
            <h4>Visítanos</h4>
            <span>Av. Fundadores 955</span>
            <span>Sienna Tower 2° piso</span>
            <span>San Pedro G.G., N.L.</span>
            <a href="tel:+528111239849">Tel. (81) 1123 9849</a>
          </div>
          <div className="footer-col">
            <h4>Horarios</h4>
            <span>L / Mi / J / V / S / D</span>
            <span>1:45 pm – 10:30 pm</span>
            <span className="footer-closed">Cerramos los martes</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-gold-line" />
      <div className="footer-bottom">
        <p>&copy; 2025 Sushi IWA &middot; Todos los derechos reservados</p>
        <div className="footer-social">
          <a href="https://instagram.com/sushi.iwa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://facebook.com/sushi.iwa" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
