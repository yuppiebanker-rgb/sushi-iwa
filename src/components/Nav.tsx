import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GoogleRating from './GoogleRating';
import { GOOGLE_RATING } from '../data/reviews';
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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  return (
    <nav className={`nav ${isHome ? 'nav--home' : ''}`} aria-label="Navegación principal">
      <Link className="logo" to="/" onClick={closeMenu}>
        <span className="logo-jp" aria-hidden="true">いわ</span>
      </Link>

      <div className="nav-right">
        {!isHome && (
          <>
            <span className="nav-rating">
              <GoogleRating score={GOOGLE_RATING.score} count={GOOGLE_RATING.count} size="sm" />
            </span>
            <ul className="nav-links-desktop" role="menubar">
              <li role="none"><Link className="nav-link" role="menuitem" to="/" onClick={closeMenu}>{t('nav.home')}</Link></li>
              <li role="none"><Link className="nav-link" role="menuitem" to="/menu" onClick={closeMenu}>{t('nav.menu')}</Link></li>
              <li role="none"><Link className="nav-link" role="menuitem" to="/ubicaciones" onClick={closeMenu}>{t('nav.locations')}</Link></li>
              <li role="none"><Link className="nav-link" role="menuitem" to="/galeria" onClick={closeMenu}>{t('nav.gallery')}</Link></li>
            </ul>
            <button className="lang-toggle" onClick={toggleLang} aria-label={`Cambiar idioma a ${lang === 'es' ? 'inglés' : 'español'}`}>
              <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
              <span className="lang-sep" aria-hidden="true">|</span>
              <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
            </button>
          </>
        )}

        {isHome ? (
          <button className="nav-cta btn-reservar-idle" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('nav.reserve')}
          </button>
        ) : (
          <Link className="nav-cta btn-reservar-idle" to="/#reservar">{t('nav.reserve')}</Link>
        )}

        <button
          className={`nav-burger ${menuOpen ? 'nav-burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Full-screen overlay */}
      <div className={`nav-overlay ${menuOpen ? 'nav-overlay--open' : ''}`}>
        <button className="nav-overlay-close" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
        <ul className="nav-overlay-links">
          {isHome ? (
            <>
              <li><a href="#menu" onClick={closeMenu}>{t('nav.menu')}</a></li>
              <li className="nav-overlay-sep" />
              <li><a href="#ubicaciones" onClick={closeMenu}>{t('nav.locations')}</a></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/galeria" onClick={closeMenu}>{t('nav.gallery')}</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/chef" onClick={closeMenu}>Chef</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/eventos" onClick={closeMenu}>Eventos</Link></li>
              <li className="nav-overlay-sep" />
              <li><a href="#reservar" onClick={closeMenu}>{t('nav.reserve')}</a></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={closeMenu}>{t('nav.home')}</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/menu" onClick={closeMenu}>{t('nav.menu')}</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/ubicaciones" onClick={closeMenu}>{t('nav.locations')}</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/galeria" onClick={closeMenu}>{t('nav.gallery')}</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/chef" onClick={closeMenu}>Chef</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/eventos" onClick={closeMenu}>Eventos</Link></li>
              <li className="nav-overlay-sep" />
              <li><Link to="/#reservar" onClick={closeMenu}>{t('nav.reserve')}</Link></li>
            </>
          )}
        </ul>
        <div className="nav-overlay-footer">
          <span>+52 81 1123 9849</span>
          <span>@sushi.iwa</span>
          <button className="lang-toggle" onClick={toggleLang}>
            <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
            <span className="lang-sep">|</span>
            <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
