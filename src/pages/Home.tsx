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
import NewsletterBanner from '../components/NewsletterBanner';
import StickyPhotoSection from '../components/StickyPhotoSection';
import AmbientTicker from '../components/AmbientTicker';
import FullBleedSection from '../components/FullBleedSection';
import HorizontalScroll from '../components/HorizontalScroll';
import KineticText from '../components/KineticText';
import SectionDivider from '../components/SectionDivider';
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

  // Parallax: hero background moves at 40% scroll speed
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-bg');
      if (!hero) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const scrollY = window.scrollY;
      hero.style.transform = `translate3d(0, ${scrollY * 0.4}px, 0)`;
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
      <section className="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', scrollSnapAlign: 'start' }}>
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

      {/* STICKY PHOTO PHILOSOPHY */}
      <StickyPhotoSection />

      {/* GALLERY STRIP */}
      <div className="gallery reveal-group photo-grid-stagger">
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/curricanes-spoons.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/hamachi-jalap.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/iwa-roll.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell gallery-item"><img src="/images/no-name.jpg" alt="Sushi IWA" /></div>
      </div>

            {/* SIGNATURE DISHES — horizontal scroll */}
      <HorizontalScroll />

      {/* CUSTOMER QUOTES */}
      <div className="section-gap-sm" />
      <CustomerQuotes />

      {/* INSTAGRAM FEED */}
      <div className="section-gap-sm" />
      <InstagramFeed />

      {/* BRAND STATEMENT */}
      <div style={{ textAlign: 'center', padding: 'clamp(40px,6vw,80px) 24px' }}>
        <KineticText
          text="Una experiencia íntima. Doce asientos. Todo el Pacífico."
          tag="p"
          stagger={45}
          delay={200}
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(18px,2.5vw,30px)',
            fontStyle: 'italic',
            color: 'rgba(244,239,230,0.6)',
          }}
        />
      </div>

      {/* LOCATIONS */}
      <div className="section-gap" />
      <SectionDivider label="Ubicaciones" labelJp="場所" number="05" />
      <section className="locations" id="ubicaciones">
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

      {/* FULL-BLEED — Interior */}
      <FullBleedSection
        imageSrc="bar"
        imageAlt="Interior Sushi IWA"
        topLabel="Monterrey · San Pedro"
        headline="12 asientos. Una historia."
        subline="La barra más íntima de San Pedro. Frente al chef. Sin intermediarios."
        ctaLabel="Reservar tu lugar"
        ctaHref="/#reservar"
        overlayPosition="bottom-right"
      />

      {/* RESERVATION */}
      <div className="section-gap" />
      <SectionDivider label="Reservaciones" labelJp="予約" number="06" />
      <section className="reservation" id="reservar">
        <div data-reveal="left" className="reservation-left">
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

      {/* NEWSLETTER BANNER */}
      <NewsletterBanner />

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
