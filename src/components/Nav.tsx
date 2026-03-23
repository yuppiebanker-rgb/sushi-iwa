import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Nav.css';

export default function Nav() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const isHome = pathname === '/';
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(lang === 'es' ? 'en' : 'es');
  };

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <Link className="logo" to="/" onClick={closeMenu}>
        <span className="logo-en">SUSHI IWA</span>
        <span className="logo-jp">い わ</span>
      </Link>

      {/* HAMBURGER BUTTON — mobile only */}
      <button
        className={`nav-burger ${menuOpen ? 'nav-burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* NAV LINKS — desktop inline, mobile fullscreen overlay */}
      <ul className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
        {isHome ? (
          <>
            <li><a href="#menu" onClick={closeMenu}>{t('nav.menu')}</a></li>
            <li><a href="#nosotros" onClick={closeMenu}>{t('nav.about')}</a></li>
            <li><a href="#ubicaciones" onClick={closeMenu}>{t('nav.locations')}</a></li>
            <li><a href="#reservar" onClick={closeMenu}>{t('nav.reservations')}</a></li>
          </>
        ) : (
          <>
            <li><Link to="/" onClick={closeMenu}>{t('nav.home')}</Link></li>
            <li><Link to="/menu" onClick={closeMenu}>{t('nav.menu')}</Link></li>
            <li><Link to="/ubicaciones" onClick={closeMenu}>{t('nav.locations')}</Link></li>
            <li><Link to="/galeria" onClick={closeMenu}>{t('nav.gallery')}</Link></li>
          </>
        )}
        {/* Mobile-only: CTA + lang inside the overlay */}
        <li className="nav-links-mobile-extra">
          <button className="lang-toggle" onClick={toggleLang}>
            <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
            <span className="lang-sep">|</span>
            <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
          </button>
        </li>
        <li className="nav-links-mobile-extra">
          {isHome ? (
            <button className="nav-cta" onClick={() => { closeMenu(); document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' }); }}>
              {t('nav.reserve')}
            </button>
          ) : (
            <Link className="nav-cta" to="/#reservar" onClick={closeMenu}>{t('nav.reserve')}</Link>
          )}
        </li>
      </ul>

      {/* DESKTOP-ONLY right section */}
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
