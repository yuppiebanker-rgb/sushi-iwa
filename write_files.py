import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Home.tsx
home = """import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import HeroVideo from '../components/HeroVideo';
import InstagramFeed from '../components/InstagramFeed';
import MazatlanNotify from '../components/MazatlanNotify';
import ReservationFlow, { getPreOrder } from '../components/ReservationFlow';
import { useRevealAll } from '../hooks/useScrollReveal';
import './Home.css';

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
        title="Sushi IWA \\u2014 Cocina Japonesa \\u00b7 San Pedro, Monterrey"
        description="Cocina japonesa de autor en San Pedro Garza Garc\\u00eda. Rolls de firma, sashimi premium, curricanes ic\\u00f3nicos y sake bar."
        path="/"
      />
      {/* TICKER */}
      <div className="ticker">
        <span>{t('ticker.comingSoon')}</span>
        <div className="dot" />
        <strong>Mazatl\\u00e1n</strong>
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
        <div className="hero-jp-watermark">\\u5ca9</div>
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

      <div className="divider"><div className="divider-line" /><span className="divider-mark">\\u4e00</span><div className="divider-line" /></div>

      {/* PHILOSOPHY */}
      <section className="philosophy" id="nosotros">
        <div data-reveal="left">
          <div className="section-tag"><div className="section-tag-line" /><span>{t('philosophy.tag')}</span></div>
          <h2>{t('philosophy.title1')}<em>{t('philosophy.titleEm')}</em><br />{t('philosophy.title2')}</h2>
          <p>{t('philosophy.p1')}</p>
          <p>{t('philosophy.p2')}</p>
          <div className="stats">
            <div className="stat"><div className="stat-num">4</div><div className="stat-label">{t('philosophy.cities')}</div></div>
            <div className="stat"><div className="stat-num">4.6\\u2605</div><div className="stat-label">{t('philosophy.rating')}</div></div>
          </div>
        </div>
        <div data-reveal="right" className="chef-frame">
          <div className="chef-corner"><span>\\u5ca9</span></div>
          <img className="chef-img" src="/images/chef-plating.jpg" alt="Chef IWA preparando" />
          <div className="chef-badge">
            <p>Chef \\u00b7 Barra abierta</p>
            <h4>Experiencia frente al chef</h4>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div className="gallery reveal-group">
        <div data-reveal className="gallery-cell"><img src="/images/curricanes-spoons.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell"><img src="/images/hamachi-jalap.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell"><img src="/images/iwa-roll.jpg" alt="Sushi IWA" /></div>
        <div data-reveal className="gallery-cell"><img src="/images/no-name.jpg" alt="Sushi IWA" /></div>
      </div>

      {/* MENU HIGHLIGHTS */}
      <section className="menu-section" id="menu">
        <div data-reveal className="menu-header">
          <div>
            <div className="section-tag" style={{ marginBottom: 14 }}><div className="section-tag-line" /><span>Carta</span></div>
            <h2>Nuestros <em>destacados</em></h2>
          </div>
        </div>
        <div className="menu-grid reveal-group">
          {[
            { img: 'iwa-roll.jpg', tag: 'Firma \\u00b7 Gluten free disponible', name: 'IWA Roll', desc: 'Callo de hacha + aguacate + pasta de cangrejo, envuelto en lajas de at\\u00fan.', price: '$310' },
            { img: 'no-name.jpg', tag: 'El legendario', name: 'No Name Roll', desc: 'Aguacate + pepino + pasta de cangrejo por dentro, envuelto de salm\\u00f3n con topping de salm\\u00f3n spicy.', price: '$385' },
            { img: 'curricanes-spoons.jpg', tag: 'Ic\\u00f3nico \\u00b7 Imprescindible', name: 'Curricanes', desc: 'At\\u00fan o salm\\u00f3n. La pieza m\\u00e1s pedida. T\\u00e9cnica japonesa con alma regia \\u2014 hay que probarlo.', price: 'desde $310' },
            { img: 'fermedina.jpg', tag: "Chef's Pick", name: "Fermedina's Roll", desc: 'Spicy kanikama + at\\u00fan + salm\\u00f3n + hamachi + aguacate, envuelto en pepino.', price: '$310' },
            { img: 'hamachi-jalap.jpg', tag: 'Del mar \\u00b7 Directo', name: 'Sashimi Hamachi', desc: 'Hamachi, hamachi jalape\\u00f1o o curry. Pescado de temporada seleccionado diariamente.', price: '$325' },
          ].map((item, i) => (
            <div data-reveal className="menu-item" key={i}>
              <div className="menu-thumb-wrap"><img className="menu-thumb" src={`/images/${item.img}`} alt={item.name} /></div>
              <div className="menu-body">
                <div className="menu-tag">{item.tag}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="menu-footer"><span className="menu-price">{item.price}</span><div className="menu-arrow">\\u2192</div></div>
              </div>
            </div>
          ))}
          <Link to="/menu" className="menu-item menu-more" data-reveal>
            <div className="menu-more-arrow">\\u2192</div>
            <span>Ver men\\u00fa completo</span>
          </Link>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <InstagramFeed />

      {/* LOCATIONS */}
      <section className="locations" id="ubicaciones">
        <div data-reveal className="section-tag" style={{ marginBottom: 14 }}><div className="section-tag-line" /><span>Ubicaciones</span></div>
        <h2 data-reveal>Encu\\u00e9ntranos en <em>4 ciudades</em></h2>
        <div className="locations-grid reveal-group">
          <div data-reveal className="loc">
            <div className="loc-num">01</div>
            <div className="loc-city">Monterrey</div>
            <div className="loc-state">Nuevo Le\\u00f3n</div>
            <div className="loc-info">Av. Fundadores 955<br />Sienna Tower, 2\\u00b0 piso<br />+52 81 1123 9849<br /><br />L\\u00b7Mi\\u00b7J\\u00b7V\\u00b7S\\u00b7D 1:45\\u201310:30pm<br />Cerramos los martes</div>
          </div>
          <div data-reveal className="loc">
            <div className="loc-num">02</div>
            <div className="loc-city">Saltillo</div>
            <div className="loc-state">Coahuila</div>
            <div className="loc-info">@iwa.saltillo<br /><br />Lu\\u2013Mi 1:30\\u201311:30pm<br />J\\u2013S 1:30pm\\u201312:30am<br />D 1:30\\u20137:00pm</div>
          </div>
          <div data-reveal className="loc">
            <div className="loc-num">03</div>
            <div className="loc-city">Hermosillo</div>
            <div className="loc-state">Sonora</div>
            <div className="loc-info">@iwa.hmo<br />(662) 191 8131<br /><br />M\\u2013Mi 1\\u201312am<br />J\\u2013S 1pm\\u20132am<br />D 1\\u201311pm \\u00b7 L cerrado</div>
          </div>
          <div data-reveal className="loc">
            <div className="loc-soon">Pr\\u00f3ximamente</div>
            <div className="loc-num" style={{ opacity: 0.28 }}>04</div>
            <div className="loc-city" style={{ opacity: 0.45 }}>Mazatl\\u00e1n</div>
            <div className="loc-state">Sinaloa</div>
            <div className="loc-info" style={{ opacity: 0.3 }}>Pr\\u00f3xima apertura<br />Reg\\u00edstrate para<br />recibir novedades</div>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section className="reservation" id="reservar">
        <div data-reveal="left" className="reservation-left">
          <div className="section-tag" style={{ marginBottom: 26 }}><div className="section-tag-line" /><span>{t('reservation.tag')}</span></div>
          <h2>{t('reservation.title1')}<br /><em>{t('reservation.titleEm')}</em></h2>
          <p>{t('reservation.desc')}</p>
          <div className="contact-row"><div className="contact-icon">\\u2706</div><div className="contact-text"><p>{t('reservation.phone')}</p><span>+52 81 1123 9849</span></div></div>
          <div className="contact-row"><div className="contact-icon">\\u2709</div><div className="contact-text"><p>{t('reservation.email')}</p><span>sushi.iwa@hotmail.com</span></div></div>
          <div className="contact-row"><div className="contact-icon">\\u2302</div><div className="contact-text"><p>{t('reservation.schedule')}</p><span>{t('reservation.scheduleValue')}</span></div></div>
          <div className="contact-row" style={{ marginTop: 8 }}><div className="contact-icon">@</div><div className="contact-text"><p>Instagram</p><span>@sushi.iwa</span></div></div>
        </div>
        <div data-reveal="right" className="form-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 38px' }}>
          <div style={{ fontFamily: 'var(--font-jp)', fontSize: 36, color: 'var(--gold)', marginBottom: 16 }}>\\u5ca9</div>
          <div className="form-title" style={{ marginBottom: 12 }}>{t('reservation.formTitle')}</div>
          <p style={{ fontSize: 13, color: 'rgba(244,239,230,0.48)', lineHeight: 1.7, marginBottom: 28, maxWidth: 320 }}>
            Reserva en 3 pasos. Selecciona ubicaci\\u00f3n, fecha, y confirma por WhatsApp.
          </p>
          <button className="form-submit" type="button" onClick={() => setResOpen(true)} style={{ maxWidth: 320 }}>
            Reservar Ahora \\u2192
          </button>
        </div>
      </section>

      {/* FLOATING RESERVE BUTTON \\u2014 mobile only */}
      <button className={`fab-reserve ${showFab ? 'fab-reserve--show' : ''}`} onClick={() => setResOpen(true)}>
        <span className="fab-jp">\\u5ca9</span> Reservar Mesa{preOrderCount > 0 ? ` (${preOrderCount})` : ''}
      </button>

      {/* RESERVATION FLOW MODAL */}
      <ReservationFlow open={resOpen} onClose={() => setResOpen(false)} />
    </>
  );
}
"""

with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(home)
print('Home.tsx written')
