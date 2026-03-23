import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import HeroVideo from '../components/HeroVideo';
import InstagramFeed from '../components/InstagramFeed';
import MazatlanNotify from '../components/MazatlanNotify';
import ReservationFlow, { getPreOrder } from '../components/ReservationFlow';
import CustomerQuotes from '../components/CustomerQuotes';
import PressStrip from '../components/PressStrip';
import AvailabilityBadge from '../components/AvailabilityBadge';
import AwardsBadges from '../components/AwardsBadges';
import './Home.css';
import '../styles/menu-effects.css';
import { useRevealAll } from '../hooks/useScrollReveal';

export default function Home() {
  const { t } = useTranslation();
  const [resOpen, setResOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const preOrderCount = getPreOrder().length;

  useRevealAll();

  useEffect(() => {
    const onScroll = () => {
      const resSection = document.getElementById('reservar');
      const resTop = resSection?.getBoundingClientRect().top ?? Infinity;
      setShowFab(window.scrollY > 600 && resTop > 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEO
        title="Sushi IWA — Mejor Sushi de San Pedro Garza García, Monterrey"
        description="Restaurante japonés en el corazón de SPGG. Curricanes de salmón, hamachi jalapeño, rollos especiales y sake. Reserva tu mesa hoy. 4.6★ Google."
        keywords="sushi san pedro garza garcia, mejor sushi monterrey, restaurante japones spgg, curricanes sushi, hamachi jalapeño monterrey, sushi iwa monterrey, japonés san pedro"
        path="/"
      />
      {/* TICKER */}
      <div className="ticker">
        <span>{t('ticker.comingSoon')}</span>
        <div className="dot" />
        <strong>Mazatlán</strong>
        <div className="dot" />
        <span>{t('ticker.location')}</span>
        <div className="dot" />
        <MazatlanNotify compact />
      </div>

      {/* HERO */}
      <section className="hero">
        <HeroVideo
          videoSrc={undefined}
          posterSrc="/images/bar.jpg"
          overlayOpacity={0.45}
        />
        <div className="hero-pattern" />
        <div className="hero-jp-watermark">岩</div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-line" />
            <span>{t('hero.eyebrow')}</span>
          </div>
          <h1 className="hero-title hero-text">{t('hero.title1')}<em>{t('hero.titleEm')}</em><br />{t('hero.title2')}</h1>
          <p className="hero-subtitle hero-sub">{t('hero.subtitle')}</p>
          <p className="hero-desc hero-sub">{t('hero.desc')}</p>
          <div className="hero-actions hero-cta">
            <button className="btn-gold" onClick={() => setResOpen(true)}>{t('hero.reserveNow')}</button>
            <Link to="/menu" className="btn-ghost">{t('hero.viewMenu')}</Link>
          </div>
        </div>
        <div className="scroll-cue">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* PRESS STRIP */}
      <PressStrip />

      <div className="divider"><div className="divider-line" /><span className="divider-mark">一</span><div className="divider-line" /></div>

      {/* PHILOSOPHY */}
      <section className="philosophy" id="nosotros">
        <div data-reveal="left">
          <div className="section-tag"><div className="section-tag-line" /><span>{t('philosophy.tag')}</span></div>
          <h2>{t('philosophy.title1')}<em>{t('philosophy.titleEm')}</em><br />{t('philosophy.title2')}</h2>
          <p>{t('philosophy.p1')}</p>
          <p>{t('philosophy.p2')}</p>
          <div className="stats">
            <div className="stat"><div className="stat-num">4</div><div className="stat-label">{t('philosophy.cities')}</div></div>
            <div className="stat"><div className="stat-num">4.6★</div><div className="stat-label">{t('philosophy.rating')}</div></div>
          </div>
        </div>
        <div data-reveal="right" className="chef-frame">
          <div className="chef-corner"><span>岩</span></div>
          <img className="chef-img" src="/images/chef-plating.jpg" alt="Chef IWA preparando" />
          <div className="chef-badge">
            <p>Chef · Barra abierta</p>
            <h4>Experiencia frente al chef</h4>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div className="gallery reveal-group">
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/curricanes-spoons.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/hamachi-jalap.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/iwa-roll.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/no-name.jpg" alt="Sushi IWA" /></div>
      </div>

      {/* MENU HIGHLIGHTS */}
      <section className="menu-section" id="menu">
        <div data-reveal className="menu-header">
          <div>
            <div className="section-tag" style={{ marginBottom: 14 }}><div className="section-tag-line" /><span>Carta</span></div>
            <h2>Nuestros <em>destacados</em></h2>
          </div>
        </div>
        {/* SEASONAL HIGHLIGHT */}
        <div data-reveal style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: '2px', marginBottom: '32px',
          background: '#0c0b09',
          border: '0.5px solid rgba(184,146,42,0.15)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/images/hamachi-jalap.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.18,
          }} />
          <div style={{
            position: 'relative',
            padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '9px', letterSpacing: '0.35em',
              textTransform: 'uppercase' as const, color: '#b8922a',
              marginBottom: '12px',
            }}>Platillo de Temporada</div>
            <h3 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 300, color: '#f4efe6',
              lineHeight: 1.2, marginBottom: '10px',
            }}>Esta temporada · <em style={{ fontStyle: 'italic', color: '#b8922a' }}>Hamachi de Japón</em></h3>
            <p style={{
              fontSize: '13px', color: '#7a7670',
              lineHeight: 1.6, maxWidth: '420px',
              margin: '0 auto',
            }}>Disponible en sashimi, jalapeño y curry hasta abril</p>
          </div>
        </div>

        <div className="menu-grid reveal-group">
          {[
            { img: 'iwa-roll.jpg', tag: 'Firma · Gluten free disponible', name: 'IWA Roll', desc: 'Callo de hacha + aguacate + pasta de cangrejo, envuelto en lajas de atún.', price: '$310' },
            { img: 'no-name.jpg', tag: 'El legendario', name: 'No Name Roll', desc: 'Aguacate + pepino + pasta de cangrejo por dentro, envuelto de salmón con topping de salmón spicy.', price: '$385' },
            { img: 'curricanes-spoons.jpg', tag: 'Icónico · Imprescindible', name: 'Curricanes', desc: 'Atún o salmón. La pieza más pedida. Técnica japonesa con alma regia — hay que probarlo.', price: 'desde $310' },
            { img: 'fermedina.jpg', tag: "Chef's Pick", name: "Fermedina's Roll", desc: 'Spicy kanikama + atún + salmón + hamachi + aguacate, envuelto en pepino.', price: '$310' },
            { img: 'hamachi-jalap.jpg', tag: 'Del mar · Directo', name: 'Sashimi Hamachi', desc: 'Hamachi, hamachi jalapeño o curry. Pescado de temporada seleccionado diariamente.', price: '$325' },
          ].map((item, i) => (
            <div data-reveal className="menu-item menu-card" key={i}>
              <div className="menu-thumb-wrap"><img className="menu-thumb" src={`/images/${item.img}`} alt={item.name} /></div>
              <div className="menu-body">
                <div className="menu-tag">{item.tag}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="menu-footer"><span className="menu-price">{item.price}</span><div className="menu-arrow">→</div></div>
              </div>
            </div>
          ))}
          <Link to="/menu" className="menu-item menu-more" data-reveal>
            <div className="menu-more-arrow">→</div>
            <span>Ver menú completo</span>
          </Link>
        </div>
      </section>

      {/* CUSTOMER QUOTES */}
      <CustomerQuotes />

      {/* INSTAGRAM FEED */}
      <InstagramFeed />

      {/* LOCATIONS */}
      <section className="locations" id="ubicaciones">
        <div data-reveal className="section-tag" style={{ marginBottom: 14 }}><div className="section-tag-line" /><span>Ubicaciones</span></div>
        <h2 data-reveal>Encuéntranos en <em>4 ciudades</em></h2>
        <div className="locations-grid reveal-group">
          <div data-reveal className="loc location-card">
            <div className="loc-num">01</div>
            <div className="loc-city">Monterrey</div>
            <div className="loc-state">Nuevo León</div>
            <div className="loc-info">Av. Fundadores 955<br />Sienna Tower, 2° piso<br />+52 81 1123 9849<br /><br />L·Mi·J·V·S·D 1:45–10:30pm<br />Cerramos los martes</div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-num">02</div>
            <div className="loc-city">Saltillo</div>
            <div className="loc-state">Coahuila</div>
            <div className="loc-info">@iwa.saltillo<br /><br />Lu–Mi 1:30–11:30pm<br />J–S 1:30pm–12:30am<br />D 1:30–7:00pm</div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-num">03</div>
            <div className="loc-city">Hermosillo</div>
            <div className="loc-state">Sonora</div>
            <div className="loc-info">@iwa.hmo<br />(662) 191 8131<br /><br />M–Mi 1–12am<br />J–S 1pm–2am<br />D 1–11pm · L cerrado</div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-soon">Próximamente</div>
            <div className="loc-num" style={{ opacity: 0.28 }}>04</div>
            <div className="loc-city" style={{ opacity: 0.45 }}>Mazatlán</div>
            <div className="loc-state">Sinaloa</div>
            <div className="loc-info" style={{ opacity: 0.3 }}>Próxima apertura<br />Regístrate para<br />recibir novedades</div>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section className="reservation" id="reservar">
        <div data-reveal="left" className="reservation-left">
          <div className="section-tag" style={{ marginBottom: 26 }}><div className="section-tag-line" /><span>{t('reservation.tag')}</span></div>
          <h2>{t('reservation.title1')}<br /><em>{t('reservation.titleEm')}</em></h2>
          <p>{t('reservation.desc')}</p>
          <div className="contact-row"><div className="contact-icon">✆</div><div className="contact-text"><p>{t('reservation.phone')}</p><span>+52 81 1123 9849</span></div></div>
          <div className="contact-row"><div className="contact-icon">✉</div><div className="contact-text"><p>{t('reservation.email')}</p><span>sushi.iwa@hotmail.com</span></div></div>
          <div className="contact-row"><div className="contact-icon">⌂</div><div className="contact-text"><p>{t('reservation.schedule')}</p><span>{t('reservation.scheduleValue')}</span></div></div>
          <div className="contact-row" style={{ marginTop: 8 }}><div className="contact-icon">@</div><div className="contact-text"><p>Instagram</p><span>@sushi.iwa</span></div></div>
        </div>
        <div data-reveal="right" className="form-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 38px' }}>
          <AvailabilityBadge />
          <div style={{ fontFamily: 'var(--font-jp)', fontSize: 36, color: 'var(--gold)', marginBottom: 16, marginTop: 12 }}>岩</div>
          <div className="form-title" style={{ marginBottom: 12 }}>{t('reservation.formTitle')}</div>
          <p style={{ fontSize: 13, color: 'rgba(244,239,230,0.48)', lineHeight: 1.7, marginBottom: 28, maxWidth: 320 }}>
            Reserva en 3 pasos. Selecciona ubicación, fecha, y confirma por WhatsApp.
          </p>
          <button className="form-submit" type="button" onClick={() => setResOpen(true)} style={{ maxWidth: 320 }}>
            Reservar Ahora →
          </button>
        </div>
      </section>

      {/* GIFT CARD BANNER */}
      <Link to="/gift-cards" style={{
        display: 'block', background: 'var(--warm)', borderTop: '0.5px solid var(--border)',
        borderBottom: '0.5px solid var(--border)', padding: '22px 24px', textAlign: 'center',
        textDecoration: 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-d)', fontSize: 17, fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.02em' }}>
          ¿Buscas el regalo perfecto?
        </span>
        <span style={{ color: 'var(--gold)', fontWeight: 500, fontSize: 14, marginLeft: 12, letterSpacing: '0.08em' }}>
          Gift Cards IWA →
        </span>
      </Link>

      {/* AWARDS STRIP */}
      <AwardsBadges />

      {/* FLOATING RESERVE BUTTON — mobile only */}
      <button className={`fab-reserve floating-reserve ${showFab ? 'fab-reserve--show' : ''}`} onClick={() => setResOpen(true)}>
        <span className="fab-jp">岩</span> Reservar Mesa{preOrderCount > 0 ? ` (${preOrderCount})` : ''}
      </button>

      {/* RESERVATION FLOW MODAL */}
      <ReservationFlow open={resOpen} onClose={() => setResOpen(false)} />
    </>
  );
}
