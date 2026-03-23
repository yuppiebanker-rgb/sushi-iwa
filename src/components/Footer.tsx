import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <div className="footer-brand-name">SUSHI IWA</div>
          <div className="footer-brand-jp">い わ</div>
          <p className="footer-tagline">
            {t('footer.tagline')}
          </p>
        </div>
        <div className="footer-col">
          <h4>{t('footer.navigation')}</h4>
          <Link to="/menu">{t('nav.menu')}</Link>
          <Link to="/chef">Nuestra Historia</Link>
          <a href="#nosotros">{t('nav.about')}</a>
          <a href="#ubicaciones">{t('nav.locations')}</a>
          <a href="#reservar">{t('nav.reservations')}</a>
          <Link to="/eventos">Eventos</Link>
          <Link to="/loyalty">Club IWA</Link>
          <Link to="/gift-cards">Gift Cards</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footer.contact')}</h4>
          <a href="https://instagram.com/sushi.iwa" target="_blank" rel="noopener noreferrer">@sushi.iwa</a>
          <a href="tel:+528111239849">+52 81 1123 9849</a>
          <a href="https://wa.me/528111239849" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:sushi.iwa@hotmail.com">sushi.iwa@hotmail.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        <div className="socials">
          <a className="social" href="https://instagram.com/sushi.iwa" target="_blank" rel="noopener noreferrer">IG</a>
          <a className="social" href="https://wa.me/528111239849" target="_blank" rel="noopener noreferrer">WA</a>
          <a className="social" href="https://facebook.com/sushi.iwa" target="_blank" rel="noopener noreferrer">FB</a>
        </div>
      </div>
    </footer>
  );
}
