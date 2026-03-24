import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import SEO from '../components/SEO';
import HeroVideo from '../components/HeroVideo';
import InstagramFeed from '../components/InstagramFeed';
import MazatlanNotify from '../components/MazatlanNotify';
import ReservationFlow, { getPreOrder } from '../components/ReservationFlow';
import CustomerQuotes from '../components/CustomerQuotes';
import AvailabilityBadge from '../components/AvailabilityBadge';
import AwardsBadges from '../components/AwardsBadges';
import NewsletterBanner from '../components/NewsletterBanner';
import './Home.css';
import '../styles/menu-effects.css';
import { useRevealAll } from '../hooks/useScrollReveal';

const MASONRY_IMAGES = [
  'curricanes-spoons.jpg', 'hamachi-jalap.jpg', 'chef-plating.jpg',
  'iwa-roll.jpg', 'interior.jpg', 'no-name.jpg',
  'sashimi-salmon.jpg', 'fermedina.jpg', 'temaki-hold.jpg',
  'nigiri-platter.jpg', 'chef-rolling.jpg', 'hamachi-jalap2.jpg',
  'curricanes-salmon.jpg', 'rainbow-roll.jpg', 'mochis.jpg',
  'bar.jpg', 'iwa-roll2.jpg', 'spicy-salmon.jpg',
  'chef-arranging.jpg', 'tostada-atun.jpg', 'edamames.jpg',
  'nigiri-salmon.jpg', 'fermedina2.jpg', 'temaki-chef.jpg',
  'sashimi-atun.jpg', 'curricanes-spoons2.jpg', 'tropical-roll.jpg',
  'iwa-roll3.jpg', 'crispy-rice.jpg', 'hamachi-roll.jpg',
  'spicy-atun.jpg', 'nigiri-mixed.jpg', 'chef-roll.jpg',
  'curricanes-salmon2.jpg', 'mashi-roll.jpg', 'temaki-sauce.jpg',
  'alcaparra-roll.jpg', 'sashimi-mix.jpg', 'nigiri-maguro.jpg',
  'baked-crab.jpg', 'spicy-hamachi.jpg', 'roca-roll.jpg',
  'camarones-roca.jpg', 'diegos-roll.jpg', 'nigiri-selection.jpg',
  'yakimeshi.jpg', 'spicy-callo.jpg', 'taisa-roll.jpg',
  'temaki-spicy.jpg', 'salmon-plancha.jpg', 'unagui-roll.jpg',
  'mochis2.jpg', 'spicy-kanikama.jpg', 'yakimeshi2.jpg',
  'curricanes-logo.jpg',
];

export default function Home() {
  const { t } = useTranslation();
  const [resOpen, setResOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const preOrderCount = getPreOrder().length;

  useRevealAll();

  const scrollToReservation = () => {
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => {
      const resSection = document.getElementById('reservar');
      const resTop = resSection?.getBoundingClientRect().top ?? Infinity;
      setShowFab(window.scrollY > 600 && resTop > 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-bg');
      if (!hero) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      hero.style.transform = `translate3d(0, ${window.scrollY * 0.4}px, 0)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEO
        title="Sushi IWA — Mejor Sushi de San Pedro Garza García, Monterrey"
        description="Restaurante japonés en el corazón de SPGG. Curricanes de salmón, hamachi jalapeño, rollos especiales y sake. Reserva tu mesa hoy. 4.6★ Google."
        keywords="sushi san pedro garza garcia, mejor sushi monterrey, restaurante japones spgg, curricanes sushi, hamachi jalapeño monterrey, sushi iwa monterrey, japonés san pedro"
        path="/"
      />

      <section className="hero">
        <div id="hero-bg" className="hero-bg-parallax">
          <HeroVideo videoSrc={undefined} posterSrc="/images/bar.jpg" overlayOpacity={0.45} />
        </div>
        <div className="hero-content">
          <span className="hero-jp hero-text">いわ</span>
          <h1 className="hero-title hero-text">Cocina <em>Japonesa</em></h1>
          <div className="hero-actions hero-cta">
            <Link to="/menu" className="btn-ghost-outline">Ver Menú →</Link>
            <button className="btn-gold" onClick={scrollToReservation}>Reservar Mesa</button>
          </div>
        </div>
        <div className="scroll-cue">
          <span className="scroll-arrow">↓</span>
          <span className="scroll-label">scroll</span>
        </div>
      </section>

      <div className="ambient-ticker">
        <div className="ticker-line ticker-line-1">
          <div className="ticker-track ticker-left">
            <span>いわ · SUSHI IWA · SAN PEDRO · MONTERREY · 寿司 · いわ · SUSHI IWA · SAN PEDRO · MONTERREY · 寿司 ·&nbsp;</span>
            <span>いわ · SUSHI IWA · SAN PEDRO · MONTERREY · 寿司 · いわ · SUSHI IWA · SAN PEDRO · MONTERREY · 寿司 ·&nbsp;</span>
          </div>
        </div>
        <div className="ticker-line ticker-line-2">
          <div className="ticker-track ticker-right">
            <span>CURRICANES · SASHIMI · NIGIRIS · TEMAKI · SAKE · HAMACHI · SALMÓN · ROLLOS · CURRICANES · SASHIMI · NIGIRIS · TEMAKI · SAKE · HAMACHI · SALMÓN · ROLLOS ·&nbsp;</span>
            <span>CURRICANES · SASHIMI · NIGIRIS · TEMAKI · SAKE · HAMACHI · SALMÓN · ROLLOS · CURRICANES · SASHIMI · NIGIRIS · TEMAKI · SAKE · HAMACHI · SALMÓN · ROLLOS ·&nbsp;</span>
          </div>
        </div>
      </div>

      <div className="section-divider"><div className="sd-line" /><span className="sd-label">FILOSOFÍA</span><div className="sd-line" /></div>

      <section className="philosophy" id="nosotros">
        <div data-reveal="left">
          <h2 className="philosophy-quote">El arte de lo <em>simple</em>, ejecutado en perfección.</h2>
          <p>Desde 2020, Sushi IWA ha sido el secreto mejor guardado de Monterrey — cocina japonesa auténtica fusionada con el paladar regio, servida frente a ti en barra íntima.</p>
        </div>
        <div data-reveal="right" className="chef-frame">
          <img className="chef-img" src="/images/chef-plating.jpg" alt="Chef IWA preparando" />
          <div className="chef-badge">
            <p>Chef · Barra abierta</p>
            <h4>Experiencia frente al chef</h4>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="sd-line" /><span className="sd-label">GALERÍA</span><div className="sd-line" /></div>

      <div className="masonry-gallery">
        {MASONRY_IMAGES.map((file, i) => (
          <div className="masonry-item" key={file} onClick={() => setLightboxIndex(i)}>
            <img src={`/images/${file}`} alt="Sushi IWA" loading="lazy" />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={MASONRY_IMAGES.map(f => ({ src: `/images/${f}`, alt: f.replace(/[-_.]/g, ' ') }))}
      />

      <div className="section-divider"><div className="sd-line" /><span className="sd-label">CURRICANES</span><div className="sd-line" /></div>

      <section className="menu-section" id="menu">
        <div data-reveal className="menu-header">
          <h2>Nuestros <em>destacados</em></h2>
        </div>
        <div className="menu-grid reveal-group">
          {[
            { img: 'iwa-roll.jpg', name: 'IWA Roll', price: '$310' },
            { img: 'no-name.jpg', name: 'No Name Roll', price: '$385' },
            { img: 'curricanes-spoons.jpg', name: 'Curricanes', price: 'desde $310' },
            { img: 'fermedina.jpg', name: "Fermedina's Roll", price: '$310' },
            { img: 'hamachi-jalap.jpg', name: 'Sashimi Hamachi', price: '$325' },
          ].map((item, i) => (
            <div data-reveal className="menu-item menu-card" key={i}>
              <div className="menu-thumb-wrap"><img className="menu-thumb" src={`/images/${item.img}`} alt={item.name} /></div>
              <div className="menu-body">
                <h3>{item.name}</h3>
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

      <CustomerQuotes />
      <InstagramFeed />

      <div className="section-divider"><div className="sd-line" /><span className="sd-label">UBICACIONES</span><div className="sd-line" /></div>

      <section className="locations" id="ubicaciones">
        <h2 data-reveal>Encuéntranos en <em>4 ciudades</em></h2>
        <div className="locations-grid reveal-group">
          <div data-reveal className="loc location-card">
            <div className="loc-city">Monterrey</div>
            <div className="loc-state">Nuevo León</div>
            <div className="loc-address">Av. Fundadores 955, Sienna Tower, 2° piso</div>
            <div className="loc-hours">L·Mi·J·V·S·D 1:45–10:30pm · Cerrado martes</div>
            <div className="loc-actions">
              <a href="tel:+528111239849" className="loc-btn">Llamar</a>
              <a href="https://wa.me/528111239849" target="_blank" rel="noopener noreferrer" className="loc-btn">WhatsApp</a>
              <a href="https://maps.google.com/?q=Sushi+IWA+Monterrey" target="_blank" rel="noopener noreferrer" className="loc-btn">Mapa</a>
            </div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-city">Saltillo</div>
            <div className="loc-state">Coahuila</div>
            <div className="loc-address">@iwa.saltillo</div>
            <div className="loc-hours">Lu–Mi 1:30–11:30pm · J–S 1:30pm–12:30am · D 1:30–7pm</div>
            <div className="loc-actions">
              <a href="https://instagram.com/iwa.saltillo" target="_blank" rel="noopener noreferrer" className="loc-btn">Instagram</a>
              <a href="https://maps.google.com/?q=Sushi+IWA+Saltillo" target="_blank" rel="noopener noreferrer" className="loc-btn">Mapa</a>
            </div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-city">Hermosillo</div>
            <div className="loc-state">Sonora</div>
            <div className="loc-address">@iwa.hmo · (662) 191 8131</div>
            <div className="loc-hours">M–Mi 1–12am · J–S 1pm–2am · D 1–11pm · L cerrado</div>
            <div className="loc-actions">
              <a href="tel:+526621918131" className="loc-btn">Llamar</a>
              <a href="https://instagram.com/iwa.hmo" target="_blank" rel="noopener noreferrer" className="loc-btn">Instagram</a>
              <a href="https://maps.google.com/?q=Sushi+IWA+Hermosillo" target="_blank" rel="noopener noreferrer" className="loc-btn">Mapa</a>
            </div>
          </div>
          <div data-reveal className="loc location-card loc-coming">
            <div className="loc-soon">Próximamente</div>
            <div className="loc-city" style={{ opacity: 0.45 }}>Mazatlán</div>
            <div className="loc-state">Sinaloa</div>
            <div className="loc-actions">
              <MazatlanNotify compact />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="sd-line" /><span className="sd-label">RESERVACIONES</span><div className="sd-line" /></div>

      <section className="reservation" id="reservar">
        <div data-reveal="left" className="reservation-left">
          <h2>Reserva tu<br /><em>experiencia</em></h2>
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

      <NewsletterBanner />
      <AwardsBadges />

      <button className={`fab-reserve floating-reserve ${showFab ? 'fab-reserve--show' : ''}`} onClick={() => setResOpen(true)}>
        <span className="fab-jp">岩</span> Reservar Mesa{preOrderCount > 0 ? ` (${preOrderCount})` : ''}
      </button>

      <ReservationFlow open={resOpen} onClose={() => setResOpen(false)} />
    </>
  );
}
