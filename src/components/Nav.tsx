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

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  return (
    <nav className="nav" aria-label="Navegación principal">
      <Link className="logo" to="/" onClick={closeMenu}>
        <span className="logo-en">SUSHI IWA</span>
        <span className="logo-jp" aria-hidden="true">い わ</span>
      </Link>

      {/* HAMBURGER BUTTON — mobile only */}
      <button
        className={`nav-burger ${menuOpen ? 'nav-burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* NAV LINKS — desktop inline, mobile fullscreen overlay */}
      <ul className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} role="menubar">
        {isHome ? (
          <>
            <li role="none"><a className="nav-link" role="menuitem" href="#menu" onClick={closeMenu}>{t('nav.menu')}</a></li>
            <li role="none"><a className="nav-link" role="menuitem" href="#nosotros" onClick={closeMenu}>{t('nav.about')}</a></li>
            <li role="none"><a className="nav-link" role="menuitem" href="#ubicaciones" onClick={closeMenu}>{t('nav.locations')}</a></li>
            <li role="none"><a className="nav-link" role="menuitem" href="#reservar" onClick={closeMenu}>{t('nav.reservations')}</a></li>
          </>
        ) : (
          <>
            <li role="none"><Link className="nav-link" role="menuitem" to="/" onClick={closeMenu}>{t('nav.home')}</Link></li>
            <li role="none"><Link className="nav-link" role="menuitem" to="/menu" onClick={closeMenu}>{t('nav.menu')}</Link></li>
            <li role="none"><Link className="nav-link" role="menuitem" to="/ubicaciones" onClick={closeMenu}>{t('nav.locations')}</Link></li>
            <li role="none"><Link className="nav-link" role="menuitem" to="/galeria" onClick={closeMenu}>{t('nav.gallery')}</Link></li>
            <li role="none"><Link className="nav-link" role="menuitem" to="/chef" onClick={closeMenu}>Nuestra Historia</Link></li>
            <li role="none"><Link className="nav-link" role="menuitem" to="/loyalty" onClick={closeMenu}>Club IWA</Link></li>
            <li role="none"><Link className="nav-link" role="menuitem" to="/gift-cards" onClick={closeMenu}>Gift Cards</Link></li>
          </>
        )}
        {/* Mobile-only: CTA + lang inside the overlay */}
        <li className="nav-links-mobile-extra" role="none">
          <button className="lang-toggle" onClick={toggleLang} aria-label={`Cambiar idioma a ${lang === 'es' ? 'inglés' : 'español'}`}>
            <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
            <span className="lang-sep" aria-hidden="true">|</span>
            <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
          </button>
        </li>
        <li className="nav-links-mobile-extra" role="none">
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
        <span className="nav-rating">
          <GoogleRating score={GOOGLE_RATING.score} count={GOOGLE_RATING.count} size="sm" />
        </span>
        <button className="lang-toggle" onClick={toggleLang} aria-label={`Cambiar idioma a ${lang === 'es' ? 'inglés' : 'español'}`}>
          <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
          <span className="lang-sep" aria-hidden="true">|</span>
          <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
        </button>
        {isHome ? (
          <button className="nav-cta btn-reservar-idle" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('nav.reserve')}
          </button>
        ) : (
          <Link className="nav-cta btn-reservar-idle" to="/#reservar">{t('nav.reserve')}</Link>
        )}
      </div>
    </nav>
  );
}
