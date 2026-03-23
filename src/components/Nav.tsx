import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Nav.css';

export default function Nav() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const isHome = pathname === '/';
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';

  const toggleLang = () => {
    i18n.changeLanguage(lang === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="nav">
      <Link className="logo" to="/">
        <span className="logo-en">SUSHI IWA</span>
        <span className="logo-jp">い わ</span>
      </Link>

      <ul className="nav-links">
        {isHome ? (
          <>
            <li><a href="#menu">{t('nav.menu')}</a></li>
            <li><a href="#nosotros">{t('nav.about')}</a></li>
            <li><a href="#ubicaciones">{t('nav.locations')}</a></li>
            <li><a href="#reservar">{t('nav.reservations')}</a></li>
          </>
        ) : (
          <>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/menu">{t('nav.menu')}</Link></li>
            <li><Link to="/ubicaciones">{t('nav.locations')}</Link></li>
            <li><Link to="/galeria">{t('nav.gallery')}</Link></li>
          </>
        )}
      </ul>

      <div className="nav-right">
        <button className="lang-toggle" onClick={toggleLang}>
          <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
          <span className="lang-sep">|</span>
          <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
        </button>
        {isHome ? (
          <button className="nav-cta" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('nav.reserve')}
          </button>
        ) : (
          <Link className="nav-cta" to="/#reservar">{t('nav.reserve')}</Link>
        )}
      </div>
    </nav>
  );
}
