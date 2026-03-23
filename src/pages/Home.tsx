import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content container">
          <p className="section-jp">寿司 · 岩</p>
          <h1 className="hero__title">SUSHI IWA</h1>
          <div className="gold-divider" style={{ margin: '1rem auto' }} />
          <p className="hero__sub">Cocina Japonesa · Chihuahua</p>
          <div className="hero__ctas">
            <Link to="/menu" className="btn btn--gold">Ver Carta</Link>
            <a href="https://wa.me/5216141234567" className="btn btn--outline" target="_blank" rel="noopener noreferrer">Reservar Mesa</a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro container">
        <p className="section-jp">哲学</p>
        <h2 className="section-title">La experiencia IWA</h2>
        <div className="gold-divider" />
        <p className="intro__text">
          Ingredientes de primera calidad, técnica japonesa depurada y el alma de Chihuahua.
          Cada pieza es preparada al momento para honrar el producto y deleitar al comensal.
        </p>
      </section>

      {/* SIGNATURE HIGHLIGHTS */}
      <section className="highlights container">
        <p className="section-jp">名物</p>
        <h2 className="section-title">Firma del Chef</h2>
        <div className="gold-divider" />
        <div className="highlights__grid">
          <article className="highlight-card">
            <div className="highlight-card__img-wrap">
              <img src="/images/curricanes-spoons.jpg" alt="Curricanes de Atún" loading="lazy" />
            </div>
            <h3>Curricanes de Atún</h3>
            <p>Maguro en cucharas. Fresco, intenso, imprescindible.</p>
            <span className="badge badge--signature">Firma</span>
          </article>
          <article className="highlight-card">
            <div className="highlight-card__img-wrap">
              <img src="/images/hamachi-jalap.jpg" alt="Hamachi Jalapeño" loading="lazy" />
            </div>
            <h3>Hamachi Jalapeño</h3>
            <p>Yellowtail con jalapeño. El más pedido.</p>
            <span className="badge badge--signature">Firma</span>
          </article>
          <article className="highlight-card">
            <div className="highlight-card__img-wrap">
              <img src="/images/iwa-roll.jpg" alt="IWA Roll" loading="lazy" />
            </div>
            <h3>IWA Roll</h3>
            <p>Callo de hacha + aguacate + cangrejo, envuelto en lajas de atún.</p>
            <span className="badge badge--signature">Firma · GF</span>
          </article>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/menu" className="btn btn--outline">Explorar la Carta Completa</Link>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location container">
        <p className="section-jp">場所</p>
        <h2 className="section-title">Encuéntranos</h2>
        <div className="gold-divider" />
        <div className="location__grid">
          <div className="location__info">
            <p><strong>Dirección</strong><br />Periférico de la Juventud 6103, Chihuahua</p>
            <p><strong>Horario</strong><br />Martes – Domingo · 13:00 – 22:00<br />Lunes cerrado</p>
            <p><strong>Contacto</strong><br />(614) 123-4567</p>
            <a href="https://wa.me/5216141234567" className="btn btn--gold" target="_blank" rel="noopener noreferrer" style={{ marginTop: '1rem' }}>
              Reservar por WhatsApp
            </a>
          </div>
          <div className="location__map">
            <iframe
              title="Sushi IWA ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8!2d-106.09!3d28.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzM2LjAiTiAxMDbCsDA1JzI0LjAiVw!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) brightness(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
