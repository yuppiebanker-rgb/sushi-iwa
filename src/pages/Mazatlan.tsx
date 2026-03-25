import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { track } from '../lib/analytics';

export default function Mazatlan() {
  const [form, setForm] = useState({ name: '', city: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.contact.trim()) return;
    setLoading(true);
    track('mazatlan_waitlist_join', { city: form.city });

    if (supabase) {
      await supabase.from('mazatlan_waitlist').insert({
        name: form.name,
        city: form.city,
        contact: form.contact,
        created_at: new Date().toISOString(),
      });
    }

    // Open WhatsApp if contact looks like a phone number
    if (form.contact.match(/\d{10}/)) {
      const msg = encodeURIComponent(
        `Hola! Me gustaría ser de los primeros en saber cuando Sushi IWA abra en Mazatlán. Nombre: ${form.name}, Ciudad: ${form.city}`
      );
      window.open(`https://wa.me/528111239849?text=${msg}`, '_blank');
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div style={{ background: '#0c0b09', minHeight: '100vh' }}>
      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          textAlign: 'center',
          padding: '0 clamp(20px,5vw,52px)',
        }}
      >
        <img
          src="/images/bar.jpg"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.22) saturate(0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(12,11,9,0.9) 0%, transparent 60%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: '"Noto Serif JP", serif',
              fontSize: '11px',
              fontWeight: 200,
              letterSpacing: '0.5em',
              color: '#b8922a',
              marginBottom: '24px',
            }}
          >
            Mazatlán · Sinaloa · Próximamente
          </div>

          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(46px,8vw,100px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f4efe6',
              lineHeight: 0.95,
              marginBottom: '24px',
            }}
          >
            El Pacífico,
            <br />
            <span style={{ color: '#d4a843' }}>en tu mesa.</span>
          </h1>

          <p
            style={{
              fontFamily: '"DM Sans"',
              fontSize: '14px',
              color: 'rgba(244,239,230,0.5)',
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 auto 40px',
            }}
          >
            Sushi IWA llega a Mazatlán. La misma obsesión por la frescura. El
            mismo chef. Una nueva ciudad.
          </p>

          <a
            href="#lista"
            style={{
              fontFamily: '"DM Sans"',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#0c0b09',
              background: '#b8922a',
              padding: '14px 32px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Quiero ser el primero
          </a>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              background:
                'linear-gradient(to bottom, rgba(184,146,42,0.6), transparent)',
            }}
          />
          <span
            style={{
              fontSize: '8px',
              letterSpacing: '0.3em',
              color: 'rgba(184,146,42,0.4)',
              textTransform: 'uppercase',
            }}
          >
            scroll
          </span>
        </div>
      </section>

      {/* ─── WHY MAZATLÁN ─── */}
      <section
        style={{
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,52px)',
          maxWidth: '960px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(28px,4vw,44px)',
            fontStyle: 'italic',
            color: '#f4efe6',
            marginBottom: '12px',
          }}
        >
          ¿Por qué Mazatlán?
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: '#7a7670',
            maxWidth: '480px',
            margin: '0 auto 48px',
            lineHeight: 1.65,
          }}
        >
          Porque el mejor sushi nace donde el mar tiene identidad.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              title: 'Puerto con identidad',
              desc: 'Cultura de mariscos del Pacífico, tradición pesquera y producto fresco cada mañana.',
            },
            {
              title: 'La misma obsesión',
              desc: 'Los estándares IWA no se negocian. La misma calidad, el mismo cuidado, nueva ciudad.',
            },
            {
              title: 'El mejor sushi del Pacífico',
              desc: 'Mazatlán merece una propuesta que honre su costa. Eso hacemos.',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: 'rgba(184,146,42,0.04)',
                border: '0.5px solid rgba(184,146,42,0.12)',
                padding: '32px 24px',
                textAlign: 'left',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: '#d4a843',
                  marginBottom: '10px',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: '#7a7670',
                  lineHeight: 1.65,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EMAIL / WHATSAPP CAPTURE ─── */}
      <section
        id="lista"
        style={{
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,52px)',
          maxWidth: '560px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {!submitted ? (
          <>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(28px,4vw,44px)',
                fontStyle: 'italic',
                color: '#f4efe6',
                marginBottom: '8px',
              }}
            >
              Quiero ser de los primeros
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#7a7670',
                marginBottom: '28px',
                lineHeight: 1.65,
              }}
            >
              Te avisamos antes de la apertura oficial. Sin spam, solo lo
              importante.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                { key: 'name' as const, placeholder: 'Tu nombre' },
                { key: 'contact' as const, placeholder: 'WhatsApp o email' },
              ].map(({ key, placeholder }) => (
                <input
                  key={key}
                  type="text"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    background: 'rgba(184,146,42,0.04)',
                    border: '0.5px solid rgba(184,146,42,0.2)',
                    padding: '14px 16px',
                    color: '#f4efe6',
                    fontSize: '14px',
                    fontFamily: '"DM Sans"',
                    outline: 'none',
                  }}
                />
              ))}

              <select
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                style={{
                  width: '100%',
                  background: '#0f0e0c',
                  border: '0.5px solid rgba(184,146,42,0.2)',
                  padding: '14px 16px',
                  color: form.city ? '#f4efe6' : '#7a7670',
                  fontSize: '14px',
                  fontFamily: '"DM Sans"',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="">Tu ciudad</option>
                {['Mazatlán', 'Culiacán', 'Los Mochis', 'Guadalajara', 'Otro'].map(
                  (c) => (
                    <option key={c} value={c} style={{ background: '#0c0b09' }}>
                      {c}
                    </option>
                  )
                )}
              </select>

              <button
                onClick={handleSubmit}
                disabled={loading || !form.contact.trim()}
                style={{
                  background: form.contact.trim()
                    ? '#b8922a'
                    : 'rgba(184,146,42,0.2)',
                  border: 'none',
                  padding: '14px 32px',
                  color: form.contact.trim() ? '#0c0b09' : '#7a7670',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontFamily: '"DM Sans"',
                  transition: 'all 0.2s',
                }}
              >
                {loading ? 'Registrando...' : 'Avisarme del lanzamiento →'}
              </button>
            </div>
          </>
        ) : (
          <div>
            <div
              style={{
                fontFamily: '"Noto Serif JP", serif',
                fontSize: '36px',
                color: '#b8922a',
                marginBottom: '16px',
              }}
            >
              いわ
            </div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '28px',
                fontStyle: 'italic',
                color: '#f4efe6',
                marginBottom: '8px',
              }}
            >
              ¡Listo, {form.name || 'amigo'}!
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#7a7670',
                lineHeight: 1.65,
              }}
            >
              Te avisaremos antes de la apertura oficial. Mazatlán nos espera.
            </p>
          </div>
        )}
      </section>

      {/* ─── OTHER LOCATIONS ─── */}
      <section
        style={{
          padding: '48px clamp(20px,5vw,52px)',
          textAlign: 'center',
          borderTop: '0.5px solid rgba(184,146,42,0.1)',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7a7670',
            marginBottom: '8px',
          }}
        >
          Ya nos encontrarás en
        </p>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '18px',
            fontStyle: 'italic',
            color: 'rgba(244,239,230,0.4)',
          }}
        >
          Monterrey · Saltillo · Hermosillo · Obregón
        </p>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          padding: '32px clamp(20px,5vw,52px)',
          textAlign: 'center',
          borderTop: '0.5px solid rgba(184,146,42,0.06)',
        }}
      >
        <p
          style={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '14px',
            color: 'rgba(184,146,42,0.3)',
            marginBottom: '6px',
          }}
        >
          いわ
        </p>
        <p style={{ fontSize: '10px', color: '#3a3835' }}>
          © {new Date().getFullYear()} Sushi IWA. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
