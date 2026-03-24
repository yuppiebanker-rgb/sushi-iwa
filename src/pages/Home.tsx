import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import HeroVideo from '../components/HeroVideo';
import InstagramFeed from '../components/InstagramFeed';
import ReservationFlow, { getPreOrder } from '../components/ReservationFlow';
import CustomerQuotes from '../components/CustomerQuotes';
import AvailabilityBadge from '../components/AvailabilityBadge';
import AwardsBadges from '../components/AwardsBadges';
import NewsletterBanner from '../components/NewsletterBanner';
import StatementSection from '../components/StatementSection';
import SectionDivider from '../components/SectionDivider';
import AmbientTicker from '../components/AmbientTicker';
import StickyPhotoSection from '../components/StickyPhotoSection';
import HorizontalScroll from '../components/HorizontalScroll';
import FullBleedSection from '../components/FullBleedSection';
import './Home.css';
import '../styles/menu-effects.css';
import '../styles/gallery.css';
import { useRevealAll } from '../hooks/useScrollReveal';

const MASONRY_IMAGES = [
  { src: 'curricanes-spoons.jpg', label: 'Curricanes' },
  { src: 'hamachi-jalap.jpg', label: 'Hamachi Jalapeño' },
  { src: 'iwa-roll.jpg', label: 'IWA Roll' },
  { src: 'no-name.jpg', label: 'No Name Roll' },
  { src: 'fermedina.jpg', label: "Fermedina's Roll" },
  { src: 'chef-plating.jpg', label: 'Chef IWA' },
  { src: 'temaki-hold.jpg', label: 'Temaki' },
  { src: 'rainbow-roll.jpg', label: 'Rainbow Roll' },
];

export default function Home() {
  const { t } = useTranslation();
  const [resOpen, setResOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
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

      {/* HERO */}
      <section className="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div id="hero-bg" style={{
          position: 'absolute',
          inset: '-20% 0',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
        }}>
          <HeroVideo
            videoSrc={undefined}
            posterSrc="/images/bar.jpg"
            overlayOpacity={0.45}
          />
        </div>
        <div className="hero-pattern" />
        <div className="hero-jp-watermark">岩</div>
        <div style={{
          position: 'absolute',
          left: 'clamp(24px, 5vw, var(--page-h-pad, 52px))',
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: '600px',
          zIndex: 2,
        }}>
          <div className="hero-text" style={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '10px',
            fontWeight: 200,
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
          <div className="hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/menu" style={{
              fontFamily: '"DM Sans"',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f4efe6',
              border: '0.5px solid rgba(244,239,230,0.4)',
              padding: '14px 32px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}>Ver Menú</Link>
            <button onClick={() => scrollToReservation()} style={{
              fontFamily: '"DM Sans"',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0c0b09',
              background: '#b8922a',
              border: 'none',
              padding: '14px 32px',
              cursor: 'pointer',
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
          zIndex: 2,
        }}>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(184,146,42,0.7), transparent)',
          }}/>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(184,146,42,0.5)',
            textTransform: 'uppercase',
          }}>scroll</span>
        </div>
      </section>

      {/* AMBIENT TICKER */}
      <AmbientTicker />

      {/* STICKY PHOTO SECTION */}
      <StickyPhotoSection />

      {/* STATEMENT */}
      <StatementSection
        word="Curricanes."
        subtitle="El platillo que define a IWA."
      />

      {/* HORIZONTAL SCROLL */}
      <HorizontalScroll />

      {/* FULL-BLEED HAMACHI */}
      <FullBleedSection
        imageSrc="hamachi-jalap"
        imageAlt="Hamachi Jalapeño — Sushi IWA"
        topLabel="Del Mar"
        headline="Hamachi Jalapeño"
        subline="Yellowtail fresco, jalapeño serrano, ponzu."
      />

      {/* AMBIENT TICKER 2 */}
      <AmbientTicker singleRow />

      {/* MASONRY GALLERY */}
      <section style={{ padding: 'clamp(48px,6vw,80px) var(--page-h-pad, 52px)' }}>
        <div className="masonry-grid">
          {MASONRY_IMAGES.map((img) => (
            <div className="masonry-item" key={img.src} style={{
              breakInside: 'avoid',
              marginBottom: '4px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              <img
                className="masonry-img"
                src={`/images/${img.src}`}
                alt={img.label}
                loading="lazy"
                style={{
                  width: '100%',
                  display: 'block',
                  filter: 'brightness(0.78) saturate(0.85)',
                  transition: 'filter 0.4s ease, transform 0.55s ease',
                }}
              />
              <div className="masonry-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(12,11,9,0.15)',
                transition: 'background 0.3s ease',
              }} />
              <span className="masonry-label" style={{
                position: 'absolute',
                bottom: '12px', left: '14px',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,230,0.6)',
                transition: 'color 0.3s ease',
              }}>{img.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION DIVIDER UBICACIONES */}
      <SectionDivider label="Ubicaciones" labelJp="場所" />

      {/* LOCATIONS */}
      <section className="locations" id="ubicaciones">
        <div className="locations-grid reveal-group">
          <div data-reveal className="loc location-card">
            <div className="loc-num">01</div>
            <div className="loc-city">Monterrey</div>
            <div className="loc-state">Nuevo León</div>
            <div className="loc-info">Av. Fundadores 955, Sienna Tower 2°<br />+52 81 1123 9849<br />L·Mi–D 1:45–10:30pm · Martes cerrado</div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-num">02</div>
            <div className="loc-city">Saltillo</div>
            <div className="loc-state">Coahuila</div>
            <div className="loc-info">@iwa.saltillo<br />Lu–Mi 1:30–11:30pm · J–S 1:30–12:30am<br />D 1:30–7pm</div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-num">03</div>
            <div className="loc-city">Hermosillo</div>
            <div className="loc-state">Sonora</div>
            <div className="loc-info">@iwa.hmo · (662) 191 8131<br />M–Mi 1–12am · J–S 1pm–2am<br />D 1–11pm · L cerrado</div>
          </div>
          <div data-reveal className="loc location-card">
            <div className="loc-soon">Próximamente</div>
            <div className="loc-num" style={{ opacity: 0.28 }}>04</div>
            <div className="loc-city" style={{ opacity: 0.45 }}>Mazatlán</div>
            <div className="loc-state">Sinaloa</div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED BAR */}
      <FullBleedSection
        imageSrc="bar"
        imageAlt="Barra Sushi IWA — 12 asientos"
        headline="12 asientos. Una historia."
        subline="Omakase frente al chef."
        overlayPosition="center"
      />

      {/* SECTION DIVIDER RESERVACIONES */}
      <SectionDivider label="Reservaciones" labelJp="予約" />

      {/* RESERVATION */}
      <section className="reservation" id="reservar">
        <div data-reveal="left" className="reservation-left">
          <h2>{t('reservation.title1')}<br /><em>{t('reservation.titleEm')}</em></h2>
          <p>Reserva en 3 pasos y confirma por WhatsApp.</p>
          <div className="contact-row"><div className="contact-icon">✆</div><div className="contact-text"><p>{t('reservation.phone')}</p><span>+52 81 1123 9849</span></div></div>
          <div className="contact-row"><div className="contact-icon">✉</div><div className="contact-text"><p>{t('reservation.email')}</p><span>sushi.iwa@hotmail.com</span></div></div>
          <div className="contact-row"><div className="contact-icon">⌂</div><div className="contact-text"><p>{t('reservation.schedule')}</p><span>{t('reservation.scheduleValue')}</span></div></div>
        </div>
        <div data-reveal="right" className="form-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 38px' }}>
          <AvailabilityBadge />
          <div style={{ fontFamily: 'var(--font-jp)', fontSize: 36, color: 'var(--gold)', marginBottom: 16, marginTop: 12 }}>岩</div>
          <div className="form-title" style={{ marginBottom: 12 }}>{t('reservation.formTitle')}</div>
          <button className="form-submit" type="button" onClick={() => setResOpen(true)} style={{ maxWidth: 320 }}>
            Reservar Ahora →
          </button>
        </div>
      </section>

      {/* CUSTOMER QUOTES */}
      <CustomerQuotes />

      {/* AWARDS */}
      <AwardsBadges />

      {/* INSTAGRAM */}
      <InstagramFeed />

      {/* GIFT CARD BANNER */}
      <Link to="/gift-cards" style={{
        display: 'block', background: 'var(--warm)', borderTop: '0.5px solid var(--border)',
        borderBottom: '0.5px solid var(--border)', padding: '22px var(--page-h-pad, 52px)', textAlign: 'center',
        textDecoration: 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-d)', fontSize: 17, fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.02em' }}>
          ¿El regalo perfecto?
        </span>
        <span style={{ color: 'var(--gold)', fontWeight: 500, fontSize: 14, marginLeft: 12, letterSpacing: '0.08em' }}>
          Gift Cards IWA →
        </span>
      </Link>

      {/* NEWSLETTER */}
      <NewsletterBanner />

      {/* FLOATING RESERVE */}
      <button className={`fab-reserve floating-reserve ${showFab ? 'fab-reserve--show' : ''}`} onClick={() => setResOpen(true)}>
        <span className="fab-jp">岩</span> Reservar Mesa{preOrderCount > 0 ? ` (${preOrderCount})` : ''}
      </button>

      <ReservationFlow open={resOpen} onClose={() => setResOpen(false)} />
    </>
  );
}
