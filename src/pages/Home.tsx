import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import SEO from '../components/SEO';
import HeroVideo from '../components/HeroVideo';
import LiveInstagram from '../components/LiveInstagram';
import MazatlanNotify from '../components/MazatlanNotify';
import ReservationFlow, { getPreOrder } from '../components/ReservationFlow';
import ConversationalReservation from '../components/ConversationalReservation';
import CustomerQuotes from '../components/CustomerQuotes';
import AvailabilityBadge from '../components/AvailabilityBadge';
import AwardsBadges from '../components/AwardsBadges';
import NewsletterBanner from '../components/NewsletterBanner';
import StickyPhotoSection from '../components/StickyPhotoSection';
import SectionDivider from '../components/SectionDivider';
import FullBleedSection from '../components/FullBleedSection';
import HorizontalScroll from '../components/HorizontalScroll';
import StatementSection from '../components/StatementSection';
import AmbientTicker from '../components/AmbientTicker';
import AIRecommendations from '../components/AIRecommendations';
import './Home.css';
import '../styles/gallery.css';
import '../styles/menu-effects.css';
import { useRevealAll } from '../hooks/useScrollReveal';

const GALLERY_IMAGES = [
  { src: 'chef-rolling',      alt: 'Chef IWA en la barra',       tall: true  },
  { src: 'curricanes-spoons', alt: 'Curricanes de salmón',       tall: false },
  { src: 'hamachi-jalap',     alt: 'Hamachi Jalapeño',           tall: false },
  { src: 'nigiri-selection',  alt: 'Selección de nigiris',       tall: true  },
  { src: 'interior',          alt: 'Interior Sushi IWA',         tall: false },
  { src: 'temaki-spicy',      alt: 'Spicy Tuna Temaki',          tall: true  },
  { src: 'sashimi-mix',       alt: 'Sashimi mixto',              tall: false },
  { src: 'bar',               alt: 'Barra de sushi IWA',         tall: false },
  { src: 'chef-plating',      alt: 'Chef presentando nigiris',   tall: true  },
  { src: 'iwa-roll',          alt: 'IWA Roll',                   tall: false },
  { src: 'rainbow-roll',      alt: 'Rainbow Roll',               tall: false },
  { src: 'mochis',            alt: 'Mochis IWA',                 tall: true  },
  { src: 'yakimeshi',         alt: 'Yakimeshi IWA',              tall: false },
  { src: 'fermedina',         alt: "Fermedina's Roll",           tall: false },
  { src: 'no-name',           alt: 'No Name Roll',               tall: true  },
  { src: 'chef-arranging',    alt: 'Chef preparando rolls',      tall: false },
  { src: 'nigiri-maguro',     alt: 'Nigiri Maguro',              tall: false },
  { src: 'spicy-atun',        alt: 'Spicy Tuna',                 tall: true  },
];

export default function Home() {
  const [resOpen, setResOpen] = useState(false);
  const [resMode, setResMode] = useState<'ai' | 'form'>('ai');
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
          <div className="hero-text" style={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '10px', fontWeight: 200,
            letterSpacing: '0.5em',
            color: '#b8922a',
            marginBottom: '20px',
            opacity: 0.8,
          }}>い わ</div>

          <h1 className="hero-h1" style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(52px, 9vw, 118px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f4efe6',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            marginBottom: '48px',
          }}>
            Cocina<br/>
            <em style={{ color: '#d4a843' }}>Japonesa</em>
          </h1>

          <div className="hero-cta" style={{
            display: 'flex', gap: '16px',
            flexWrap: 'wrap',
          }}>
            <Link to="/menu" style={{
              fontFamily: '"DM Sans"', fontSize: '11px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#f4efe6',
              border: '0.5px solid rgba(244,239,230,0.4)',
              padding: '14px 32px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              minHeight: '44px', display: 'flex', alignItems: 'center',
            }}>Ver Menú</Link>
            <button onClick={() => scrollToReservation()} style={{
              fontFamily: '"DM Sans"', fontSize: '11px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#0c0b09',
              background: '#b8922a', border: 'none',
              padding: '14px 32px', cursor: 'pointer',
              transition: 'background 0.2s',
              minHeight: '44px',
            }}>Reservar Mesa</button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'scrollFloat 2.2s ease-in-out infinite',
        }}>
          <div style={{
            width: '1px', height: '48px',
            background: 'linear-gradient(to bottom, rgba(184,146,42,0.7), transparent)',
          }}/>
          <span style={{
            fontSize: '9px', letterSpacing: '0.3em',
            color: 'rgba(184,146,42,0.5)',
            textTransform: 'uppercase',
          }}>scroll</span>
        </div>
      </section>

      <AIRecommendations variant="inline" />

      {/* AMBIENT TICKER — atmospheric, right after hero */}
      <AmbientTicker />

      {/* STICKY PHOTO SECTION — philosophy via sticky scroll */}
      <StickyPhotoSection />

      {/* STATEMENT — "Curricanes." oversized type */}
      <StatementSection
        word="Curricanes."
        subtitle="El platillo que define a IWA."
      />

      {/* HORIZONTAL SCROLL — 6 signature dishes */}
      <HorizontalScroll />

      {/* FULL BLEED — Hamachi */}
      <FullBleedSection
        imageSrc="hamachi-jalap"
        imageAlt="Hamachi Jalapeño Sushi IWA"
        topLabel="Platillo Firma"
        headline="Hamachi Jalapeño"
        subline="Yellowtail fresco. Jalapeño serrano. Sin adornos."
        overlayPosition="bottom-left"
      />

      {/* AMBIENT TICKER — second instance, reversed */}
      <AmbientTicker singleRow />

      {/* MASONRY GALLERY */}
      <div className="masonry-gallery">
        {GALLERY_IMAGES.map((img, i) => (
          <div className={`masonry-item${img.tall ? ' masonry-tall' : ''}`} key={img.src} onClick={() => setLightboxIndex(i)}>
            <img src={`/images/${img.src}.jpg`} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={GALLERY_IMAGES.map(img => ({ src: `/images/${img.src}.jpg`, alt: img.alt }))}
      />

      {/* LOCATIONS */}
      <div className="section-gap" />
      <SectionDivider label="Ubicaciones" labelJp="場所" />

      <section className="locations" id="ubicaciones">
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

      {/* FULL BLEED — bar/interior */}
      <FullBleedSection
        imageSrc="bar"
        imageAlt="Barra Sushi IWA"
        topLabel="La Barra"
        headline="12 asientos. Una historia."
        overlayPosition="bottom-right"
      />

      {/* RESERVATIONS */}
      <div className="section-gap" />
      <SectionDivider label="Reservaciones" labelJp="予約" />

      <section className="reservation" id="reservar">
        <div data-reveal="left" className="reservation-left">
          <h2>Reserva tu<br /><em>experiencia</em></h2>
          <div className="contact-row"><div className="contact-icon">✆</div><div className="contact-text"><p>Teléfono</p><span>+52 81 1123 9849</span></div></div>
          <div className="contact-row"><div className="contact-icon">✉</div><div className="contact-text"><p>Email</p><span>sushi.iwa@hotmail.com</span></div></div>
          <div className="contact-row"><div className="contact-icon">⌂</div><div className="contact-text"><p>Horario</p><span>L·Mi–D 1:45–10:30pm</span></div></div>
        </div>
        <div data-reveal="right" className="form-card" id="reservation-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 20px' }}>
          <AvailabilityBadge />
          <div style={{ display: 'flex', gap: '0', margin: '16px 0 20px', border: '0.5px solid rgba(184,146,42,0.2)', width: '100%', maxWidth: 360 }}>
            <button onClick={() => setResMode('ai')} style={{ flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', background: resMode === 'ai' ? 'rgba(184,146,42,0.15)' : 'transparent', color: resMode === 'ai' ? '#b8922a' : '#7a7670', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', fontFamily: '"DM Sans", sans-serif', transition: 'all 0.2s' }}>
              Reservar con IA
            </button>
            <button onClick={() => setResMode('form')} style={{ flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', borderLeft: '0.5px solid rgba(184,146,42,0.2)', background: resMode === 'form' ? 'rgba(184,146,42,0.15)' : 'transparent', color: resMode === 'form' ? '#b8922a' : '#7a7670', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', fontFamily: '"DM Sans", sans-serif', transition: 'all 0.2s' }}>
              Formulario clásico
            </button>
          </div>
          {resMode === 'ai' ? (
            <ConversationalReservation />
          ) : (
            <>
              <div style={{ fontFamily: 'var(--font-jp)', fontSize: 36, color: 'var(--gold)', marginBottom: 16, marginTop: 12 }}>岩</div>
              <div className="form-title" style={{ marginBottom: 12 }}>Reserva en 3 pasos</div>
              <button className="form-submit" type="button" onClick={() => setResOpen(true)} style={{ maxWidth: 320 }}>
                Reservar Ahora →
              </button>
            </>
          )}
        </div>
      </section>

      {/* CUSTOMER QUOTES */}
      <CustomerQuotes />

      {/* AWARDS */}
      <AwardsBadges />

      {/* INSTAGRAM */}
      <LiveInstagram />

      {/* NEWSLETTER */}
      <NewsletterBanner />

      <button className={`fab-reserve floating-reserve ${showFab ? 'fab-reserve--show' : ''}`} onClick={() => setResOpen(true)}>
        <span className="fab-jp">岩</span> Reservar Mesa{preOrderCount > 0 ? ` (${preOrderCount})` : ''}
      </button>

      <ReservationFlow open={resOpen} onClose={() => setResOpen(false)} />
    </>
  );
}
