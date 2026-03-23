import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import InstagramFeed from '../components/InstagramFeed';
import MazatlanNotify from '../components/MazatlanNotify';
import './Home.css';

const TIMES = ['1:45 pm', '3:00 pm', '5:00 pm', '7:00 pm', '8:30 pm', '9:30 pm'];
const PEOPLE = ['1', '2', '3', '4', '5', '6+'];
const LOCS = ['Monterrey — Fundadores', 'Saltillo', 'Hermosillo', 'Cd. Obregón'];

export default function Home() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: TIMES[0], people: '2', location: LOCS[0], occasion: '' });

  return (
    <>
      <SEO
        title="Sushi IWA — Cocina Japonesa · San Pedro, Monterrey"
        description="Cocina japonesa de autor en San Pedro Garza García. Rolls de firma, sashimi premium, curricanes icónicos y sake bar."
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
        <div className="hero-bg" style={{ backgroundImage: `url(/images/bar.jpg)` }} />
        <div className="hero-overlay" />
        <div className="hero-pattern" />
        <div className="hero-jp-watermark">岩</div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-line" />
            <span>{t('hero.eyebrow')}</span>
          </div>
          <h1 className="hero-title">{t('hero.title1')}<em>{t('hero.titleEm')}</em><br />{t('hero.title2')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <p className="hero-desc">{t('hero.desc')}</p>
          <div className="hero-actions">
            <button className="btn-gold" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>{t('hero.reserveNow')}</button>
            <Link to="/menu" className="btn-ghost">{t('hero.viewMenu')}</Link>
          </div>
        </div>
        <div className="scroll-cue">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <div className="divider"><div className="divider-line" /><span className="divider-mark">一</span><div className="divider-line" /></div>

      {/* PHILOSOPHY */}
      <section className="philosophy" id="nosotros">
        <div>
          <div className="section-tag"><div className="section-tag-line" /><span>{t('philosophy.tag')}</span></div>
          <h2>{t('philosophy.title1')}<em>{t('philosophy.titleEm')}</em><br />{t('philosophy.title2')}</h2>
          <p>{t('philosophy.p1')}</p>
          <p>{t('philosophy.p2')}</p>
          <div className="stats">
            <div className="stat"><div className="stat-num">4</div><div className="stat-label">{t('philosophy.cities')}</div></div>
            <div className="stat"><div className="stat-num">4.6★</div><div className="stat-label">{t('philosophy.rating')}</div></div>
          </div>
        </div>
        <div className="chef-frame">
          <div className="chef-corner"><span>岩</span></div>
          <img className="chef-img" src="/images/chef-plating.jpg" alt="Chef IWA preparando" />
          <div className="chef-badge">
            <p>Chef · Barra abierta</p>
            <h4>Experiencia frente al chef</h4>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div className="gallery">
        <div className="gallery-cell"><img src="/images/curricanes-spoons.jpg" alt="Sushi IWA" /></div>
        <div className="gallery-cell"><img src="/images/hamachi-jalap.jpg" alt="Sushi IWA" /></div>
        <div className="gallery-cell"><img src="/images/iwa-roll.jpg" alt="Sushi IWA" /></div>
        <div className="gallery-cell"><img src="/images/no-name.jpg" alt="Sushi IWA" /></div>
      </div>

      {/* MENU HIGHLIGHTS */}
      <section className="menu-section" id="menu">
        <div className="menu-header">
          <div>
            <div className="section-tag" style={{ marginBottom: 14 }}><div className="section-tag-line" /><span>Carta</span></div>
            <h2>Nuestros <em>destacados</em></h2>
          </div>
        </div>
        <div className="menu-grid">
          {[
            { img: 'iwa-roll.jpg', tag: 'Firma · Gluten free disponible', name: 'IWA Roll', desc: 'Callo de hacha + aguacate + pasta de cangrejo, envuelto en lajas de atún.', price: '$310' },
            { img: 'no-name.jpg', tag: 'El legendario', name: 'No Name Roll', desc: 'Aguacate + pepino + pasta de cangrejo por dentro, envuelto de salmón con topping de salmón spicy.', price: '$385' },
            { img: 'curricanes-spoons.jpg', tag: 'Icónico · Imprescindible', name: 'Curricanes', desc: 'Atún o salmón. La pieza más pedida. Técnica japonesa con alma regia — hay que probarlo.', price: 'desde $310' },
            { img: 'fermedina.jpg', tag: "Chef's Pick", name: "Fermedina's Roll", desc: 'Spicy kanikama + atún + salmón + hamachi + aguacate, envuelto en pepino.', price: '$310' },
            { img: 'hamachi-jalap.jpg', tag: 'Del mar · Directo', name: 'Sashimi Hamachi', desc: 'Hamachi, hamachi jalapeño o curry. Pescado de temporada seleccionado diariamente.', price: '$325' },
          ].map((item, i) => (
            <div className="menu-item" key={i}>
              <div className="menu-thumb-wrap"><img className="menu-thumb" src={`/images/${item.img}`} alt={item.name} /></div>
              <div className="menu-body">
                <div className="menu-tag">{item.tag}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="menu-footer"><span className="menu-price">{item.price}</span><div className="menu-arrow">→</div></div>
              </div>
            </div>
          ))}
          <Link to="/menu" className="menu-item menu-more">
            <div className="menu-more-arrow">→</div>
            <span>Ver menú completo</span>
          </Link>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <InstagramFeed />

      {/* LOCATIONS */}
      <section className="locations" id="ubicaciones">
        <div className="section-tag" style={{ marginBottom: 14 }}><div className="section-tag-line" /><span>Ubicaciones</span></div>
        <h2>Encuéntranos en <em>4 ciudades</em></h2>
        <div className="locations-grid">
          <div className="loc">
            <div className="loc-num">01</div>
            <div className="loc-city">Monterrey</div>
            <div className="loc-state">Nuevo León</div>
            <div className="loc-info">Av. Fundadores 955<br />Sienna Tower, 2° piso<br />+52 81 1123 9849<br /><br />L·Mi·J·V·S·D 1:45–10:30pm<br />Cerramos los martes</div>
          </div>
          <div className="loc">
            <div className="loc-num">02</div>
            <div className="loc-city">Saltillo</div>
            <div className="loc-state">Coahuila</div>
            <div className="loc-info">@iwa.saltillo<br /><br />Lu–Mi 1:30–11:30pm<br />J–S 1:30pm–12:30am<br />D 1:30–7:00pm</div>
          </div>
          <div className="loc">
            <div className="loc-num">03</div>
            <div className="loc-city">Hermosillo</div>
            <div className="loc-state">Sonora</div>
            <div className="loc-info">@iwa.hmo<br />(662) 191 8131<br /><br />M–Mi 1–12am<br />J–S 1pm–2am<br />D 1–11pm · L cerrado</div>
          </div>
          <div className="loc">
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
        <div className="reservation-left">
          <div className="section-tag" style={{ marginBottom: 26 }}><div className="section-tag-line" /><span>{t('reservation.tag')}</span></div>
          <h2>{t('reservation.title1')}<br /><em>{t('reservation.titleEm')}</em></h2>
          <p>{t('reservation.desc')}</p>
          <div className="contact-row"><div className="contact-icon">✆</div><div className="contact-text"><p>{t('reservation.phone')}</p><span>+52 81 1123 9849</span></div></div>
          <div className="contact-row"><div className="contact-icon">✉</div><div className="contact-text"><p>{t('reservation.email')}</p><span>sushi.iwa@hotmail.com</span></div></div>
          <div className="contact-row"><div className="contact-icon">⌂</div><div className="contact-text"><p>{t('reservation.schedule')}</p><span>{t('reservation.scheduleValue')}</span></div></div>
          <div className="contact-row" style={{ marginTop: 8 }}><div className="contact-icon">@</div><div className="contact-text"><p>Instagram</p><span>@sushi.iwa</span></div></div>
        </div>
        <div className="form-card">
          <div className="form-title">{t('reservation.formTitle')}</div>
          <div className="form-row">
            <div className="field"><label>{t('reservation.name')}</label><input type="text" placeholder="Tu nombre completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div className="field"><label>{t('reservation.phone')}</label><input type="tel" placeholder="+52 81 ··· ····" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>{t('reservation.date')}</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
            <div className="field"><label>{t('reservation.preferredTime')}</label><select value={form.time} onChange={e => setForm({...form, time: e.target.value})}>{TIMES.map(t => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="field"><label>{t('reservation.guests')}</label><select value={form.people} onChange={e => setForm({...form, people: e.target.value})}>{PEOPLE.map(p => <option key={p}>{p}</option>)}</select></div>
            <div className="field"><label>{t('reservation.location')}</label><select value={form.location} onChange={e => setForm({...form, location: e.target.value})}>{LOCS.map(l => <option key={l}>{l}</option>)}</select></div>
          </div>
          <div className="field"><label>{t('reservation.occasion')}</label><input type="text" placeholder="Cumpleaños, aniversario..." value={form.occasion} onChange={e => setForm({...form, occasion: e.target.value})} /></div>
          <button className="form-submit" type="button" onClick={() => {
            const msg = `Reservación IWA:\n${form.name}\n${form.date} ${form.time}\n${form.people} personas\n${form.location}\n${form.occasion}`;
            window.open(`https://wa.me/528111239849?text=${encodeURIComponent(msg)}`, '_blank');
          }}>{t('reservation.submit')}</button>
        </div>
      </section>
    </>
  );
}
