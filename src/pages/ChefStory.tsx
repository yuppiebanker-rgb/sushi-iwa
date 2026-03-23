import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useRevealAll } from '../hooks/useScrollReveal';

const gold = '#b8922a';
const bg = '#0c0b09';
const text = '#f4efe6';
const muted = 'rgba(244,239,230,0.48)';

const Divider = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '20px', padding: '60px 0',
  }}>
    <div style={{ width: '60px', height: '0.5px', background: 'rgba(184,146,42,0.25)' }} />
    <span style={{ fontFamily: '"Noto Serif JP", serif', fontSize: '18px', color: gold, opacity: 0.5 }}>岩</span>
    <div style={{ width: '60px', height: '0.5px', background: 'rgba(184,146,42,0.25)' }} />
  </div>
);

export default function ChefStory() {
  useRevealAll();

  return (
    <>
      <SEO
        title="Nuestra Historia — Sushi IWA"
        description="La historia detrás de IWA: origen, filosofía, ingredientes y equipo."
        path="/chef"
      />

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '85vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: bg, overflow: 'hidden',
      }}>
        <img
          src="/images/chef-plating.jpg"
          alt="Chef IWA"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.35,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${bg} 100%)`,
        }} />
        <div data-reveal style={{
          position: 'relative', textAlign: 'center', padding: '0 24px',
          maxWidth: '700px', opacity: 0, transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <p style={{
            fontFamily: '"Noto Serif JP", serif', fontSize: '42px',
            color: gold, marginBottom: '16px',
          }}>岩</p>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300,
            color: text, lineHeight: 1.2, margin: '0 0 20px',
          }}>
            Nuestra <em style={{ fontStyle: 'italic', color: gold }}>Historia</em>
          </h1>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '13px',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: muted,
          }}>
            Permanencia &middot; Fundamento &middot; Honestidad
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div style={{ background: bg, color: text }}>

        {/* SECTION 1 — El origen */}
        <Divider />
        <section data-reveal style={{
          maxWidth: '720px', margin: '0 auto', padding: '0 24px 0',
          textAlign: 'center',
          opacity: 0, transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: gold, marginBottom: '28px',
          }}>El origen</p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 300,
            lineHeight: 1.8, color: text,
          }}>
            <span style={{ fontFamily: '"Noto Serif JP", serif', color: gold }}>いわ</span> — en japonés, &ldquo;roca&rdquo;. Permanencia. Fundamento.<br />
            Algo construido para durar.
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 300,
            lineHeight: 1.9, color: muted, marginTop: '32px',
          }}>
            En 2020, en el corazón de San Pedro Garza García,
            nació un restaurante con una sola obsesión:
            servir el sushi más honesto de Monterrey.
          </p>
        </section>

        {/* SECTION 2 — La filosofía */}
        <Divider />
        <section data-reveal style={{
          maxWidth: '720px', margin: '0 auto', padding: '0 24px',
          textAlign: 'center',
          opacity: 0, transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: gold, marginBottom: '28px',
          }}>La filosofía</p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 300,
            lineHeight: 1.8, color: text,
          }}>
            Cada platillo en IWA comienza con una pregunta:<br />
            <em style={{ fontStyle: 'italic', color: gold }}>¿qué hace que este ingrediente sea extraordinario?</em>
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 300,
            lineHeight: 1.7, color: muted, marginTop: '28px',
          }}>
            No añadimos. Revelamos.
          </p>
        </section>

        {/* Full-bleed image break */}
        <div style={{ margin: '80px 0', position: 'relative', height: '50vh', overflow: 'hidden' }}>
          <img
            src="/images/chef-rolling.jpg"
            alt="Chef preparando sushi"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: 0.5,
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to bottom, ${bg} 0%, transparent 20%, transparent 80%, ${bg} 100%)`,
          }} />
        </div>

        {/* SECTION 3 — Los ingredientes */}
        <section data-reveal style={{
          maxWidth: '720px', margin: '0 auto', padding: '0 24px',
          textAlign: 'center',
          opacity: 0, transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: gold, marginBottom: '28px',
          }}>Nuestros ingredientes</p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 300,
            lineHeight: 2, color: text,
          }}>
            Salmón de aguas frías del Atlántico canadiense.<br />
            Hamachi de criaderos certificados en Japón.<br />
            Arroz de grano corto seleccionado.
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 300,
            lineHeight: 1.9, color: muted, marginTop: '28px',
          }}>
            Cada ingrediente recorre miles de kilómetros<br />
            para llegar a tu mesa en menos de 48 horas.
          </p>
        </section>

        {/* SECTION 4 — El equipo */}
        <Divider />
        <section data-reveal style={{
          maxWidth: '720px', margin: '0 auto', padding: '0 24px',
          textAlign: 'center',
          opacity: 0, transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: gold, marginBottom: '28px',
          }}>El equipo</p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 300,
            lineHeight: 1.9, color: text,
          }}>
            Detrás de cada pieza hay manos que conocen el oficio.<br />
            Un equipo que comparte la misma obsesión por el detalle,<br />
            la frescura y el respeto al ingrediente.
          </p>
        </section>

        {/* SECTION 5 — CTA */}
        <Divider />
        <section data-reveal style={{
          maxWidth: '520px', margin: '0 auto', padding: '0 24px 100px',
          textAlign: 'center',
          opacity: 0, transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          <p style={{
            fontFamily: '"Noto Serif JP", serif', fontSize: '32px',
            color: gold, marginBottom: '24px',
          }}>岩</p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '24px', fontWeight: 300, color: text,
            marginBottom: '36px', lineHeight: 1.6,
          }}>
            Ven a vivir la experiencia IWA.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/#reservar" style={{
              display: 'inline-block', padding: '14px 36px',
              background: gold, color: bg,
              fontFamily: '"DM Sans", sans-serif', fontSize: '12px',
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: '0',
            }}>
              Reservar Mesa
            </Link>
            <Link to="/menu" style={{
              display: 'inline-block', padding: '14px 36px',
              border: `1px solid ${gold}`, color: gold, background: 'transparent',
              fontFamily: '"DM Sans", sans-serif', fontSize: '12px',
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: '0',
            }}>
              Ver Menú
            </Link>
          </div>
        </section>
      </div>

      {/* Reveal animation styles */}
      <style>{`
        [data-reveal].visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
}
