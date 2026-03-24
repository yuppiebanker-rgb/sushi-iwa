import { useState } from 'react';
import SEO from '../components/SEO';
import KineticText from '../components/KineticText';
import './Events.css';

const WA_NUMBER = '528111239849';

const eventTypes = [
  {
    tag: 'Experiencia exclusiva',
    title: 'Mesa del Chef',
    quote: 'La barra completa, para ti y tus invitados.',
    items: [
      'Hasta 12 personas en la barra de sushi',
      'Menú degustación diseñado por el chef',
      'Sake pairing disponible',
      'Duración: 2.5 – 3 horas',
    ],
    price: 'Desde $850 MXN por persona',
    icon: 'chef',
  },
  {
    tag: 'Celebración privada',
    title: 'Cena Privada',
    quote: 'El salón completo, una noche exclusiva.',
    items: [
      'Hasta 40 personas',
      'Menú personalizado o carta completa',
      'Decoración especial disponible',
      'Servicio de meseros dedicados',
    ],
    price: 'Desde $650 MXN por persona',
    icon: 'table',
  },
  {
    tag: 'Fuera del restaurante',
    title: 'Catering Ejecutivo',
    quote: 'IWA en tu oficina o evento.',
    items: [
      'Monterrey y área metropolitana',
      'Sets de sushi, sashimi y rollos',
      'Menú mínimo $8,000 MXN',
      'Equipo de preparación en sitio',
      'Coordinación incluida',
    ],
    price: 'Desde $8,000 MXN',
    icon: 'briefcase',
  },
];

const galleryImages = [
  { src: '/images/interior.jpg', alt: 'Interior IWA preparado para evento' },
  { src: '/images/bar.jpg', alt: 'Barra de sushi IWA' },
  { src: '/images/chef-arranging.jpg', alt: 'Chef preparando servicio' },
  { src: '/images/chef-rolling.jpg', alt: 'Mesa de evento vista superior' },
];

const testimonials = [
  {
    text: 'Celebramos el cumpleaños de mi esposo con la barra completa. El chef Pedro hizo cada rollo frente a nosotros. Una noche que no olvidaremos.',
    author: 'Patricia M., Monterrey',
  },
  {
    text: 'El catering ejecutivo para nuestro cierre de año fue perfecto. 200 personas, todo impecable.',
    author: 'Empresa XYZ',
  },
];

const faqs = [
  {
    q: '¿Con cuánta anticipación debo reservar?',
    a: 'Recomendamos al menos 2 semanas para eventos pequeños y 1 mes para grupos grandes.',
  },
  {
    q: '¿Tienen menú vegetariano?',
    a: 'Sí, diseñamos opciones especiales según las necesidades del grupo.',
  },
  {
    q: '¿Incluye bebidas?',
    a: 'Bebidas y sake pairing son adicionales y se coordinan con anticipación.',
  },
];

function IconChef() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

function IconTable() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="3" rx="1" />
      <line x1="5" y1="10" x2="5" y2="20" />
      <line x1="19" y1="10" x2="19" y2="20" />
      <line x1="2" y1="15" x2="22" y2="15" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

const icons: Record<string, () => React.ReactNode> = {
  chef: IconChef,
  table: IconTable,
  briefcase: IconBriefcase,
};

const budgetOptions = [
  '$5,000 – $15,000',
  '$15,000 – $40,000',
  '$40,000+',
  'Por definir',
];

export default function Events() {
  const [form, setForm] = useState({
    tipo: 'Mesa del Chef',
    fecha: '',
    personas: '',
    presupuesto: budgetOptions[0],
    nombre: '',
    whatsapp: '',
    detalles: '',
  });

  const set = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola IWA! Me interesa un evento privado:\nTipo: ${form.tipo}\nFecha: ${form.fecha}\nPersonas: ${form.personas}\nPresupuesto: ${form.presupuesto}\nNombre: ${form.nombre}\nDetalles: ${form.detalles}\n¿Me pueden dar más información?`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener');
  };

  return (
    <>
      <SEO
        title="Eventos Privados — Sushi IWA · Monterrey"
        description="Cenas íntimas, eventos corporativos y catering ejecutivo. Experiencias privadas en Sushi IWA, Monterrey."
        path="/eventos"
      />

      {/* A) HERO */}
      <section className="ev-hero">
        <div className="ev-hero-bg" style={{ backgroundImage: 'url(/images/interior.jpg)' }} />
        <div className="ev-hero-overlay" />
        <div className="ev-hero-content">
          <KineticText
            text="Experiencias Privadas · いわ"
            tag="h1"
            stagger={70}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f4efe6',
              lineHeight: 1.1,
            }}
          />
          <p className="ev-hero-subtitle">特別な体験</p>
          <p className="ev-hero-desc">
            Cenas íntimas. Eventos corporativos. Celebraciones únicas.
          </p>
        </div>
      </section>

      {/* B) EVENT TYPES */}
      <section className="ev-types">
        <div className="ev-types-header">
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            <div className="section-tag-line" /><span>Eventos</span>
          </div>
          <h2>Tres formas de vivir <em>IWA</em></h2>
        </div>
        <div className="ev-types-grid">
          {eventTypes.map(ev => {
            const Icon = icons[ev.icon];
            return (
              <div className="ev-card" key={ev.title}>
                <div className="ev-card-icon"><Icon /></div>
                <div className="ev-card-tag">{ev.tag}</div>
                <h3>{ev.title}</h3>
                <p className="ev-card-quote">“{ev.quote}”</p>
                <ul>
                  {ev.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="ev-card-price">{ev.price}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* C) GALLERY */}
      <div className="ev-gallery">
        {galleryImages.map((img, i) => (
          <div className="ev-gallery-cell" key={i}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {/* D) TESTIMONIALS */}
      <section className="ev-testimonials">
        <div className="ev-testimonials-header">
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            <div className="section-tag-line" /><span>Testimonios</span>
          </div>
          <h2>Lo que dicen nuestros <em>invitados</em></h2>
        </div>
        <div className="ev-testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="ev-testimonial" key={i}>
              <blockquote>“{t.text}”</blockquote>
              <cite>— {t.author}</cite>
            </div>
          ))}
        </div>
      </section>

      {/* E) INQUIRY FORM */}
      <section className="ev-form-section" id="consulta">
        <div className="ev-form-wrap">
          <div className="ev-form-header">
            <h2>Solicita tu <em>evento</em></h2>
            <p>Cuéntanos sobre tu celebración y te contactamos en menos de 24 horas.</p>
          </div>
          <form className="ev-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label>Tipo de evento</label>
                <select value={form.tipo} onChange={set('tipo')}>
                  <option>Mesa del Chef</option>
                  <option>Cena Privada</option>
                  <option>Catering</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="field">
                <label>Fecha tentativa</label>
                <input type="date" value={form.fecha} onChange={set('fecha')} required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Número de personas</label>
                <input
                  type="number" min="1" placeholder="Ej. 20"
                  value={form.personas} onChange={set('personas')} required
                />
              </div>
              <div className="field">
                <label>Presupuesto estimado</label>
                <select value={form.presupuesto} onChange={set('presupuesto')}>
                  {budgetOptions.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Nombre y empresa</label>
                <input
                  type="text" placeholder="Tu nombre"
                  value={form.nombre} onChange={set('nombre')} required
                />
              </div>
              <div className="field">
                <label>WhatsApp</label>
                <input
                  type="tel" placeholder="+52 81 ..."
                  value={form.whatsapp} onChange={set('whatsapp')} required
                />
              </div>
            </div>
            <div className="field">
              <label>Detalles adicionales</label>
              <textarea
                placeholder="Cuéntanos más sobre tu evento..."
                value={form.detalles} onChange={set('detalles')}
              />
            </div>
            <button className="form-submit" type="submit">
              Enviar consulta por WhatsApp →
            </button>
          </form>
        </div>
      </section>

      {/* F) FAQ */}
      <section className="ev-faq">
        <div className="ev-faq-header">
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 14 }}>
            <div className="section-tag-line" /><span>Preguntas frecuentes</span>
          </div>
          <h2>Todo sobre <em>eventos</em></h2>
        </div>
        <div className="ev-faq-list">
          {faqs.map((faq, i) => (
            <div className="ev-faq-item" key={i}>
              <div className="ev-faq-q">{faq.q}</div>
              <div className="ev-faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
