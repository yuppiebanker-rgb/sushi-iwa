import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { track } from '../lib/analytics';
import SEO from '../components/SEO';

export default function Franquicia() {
  const [form, setForm] = useState({
    name: '', city: '', phone: '',
    investment: '', experience: '', why: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.city) return;
    setLoading(true);
    track('franchise_inquiry_submitted' as any, {
      city: form.city, investment: form.investment,
    });
    await supabase?.from('franchise_inquiries').insert({
      ...form, created_at: new Date().toISOString(),
    });

    const msg = encodeURIComponent(
      `\u{1F3EA} *Nueva consulta de franquicia IWA*\n\n` +
      `Nombre: ${form.name}\n` +
      `Ciudad objetivo: ${form.city}\n` +
      `WhatsApp: ${form.phone}\n` +
      `Inversi\u00f3n: ${form.investment}\n` +
      `Experiencia: ${form.experience}\n` +
      `Por qu\u00e9 IWA: ${form.why}`
    );
    window.open(`https://wa.me/528111239849?text=${msg}`, '_blank');
    setSubmitted(true);
    setLoading(false);
  };

  const input = (key: keyof typeof form, placeholder: string, type = 'text') => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key]}
      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
      style={{
        width: '100%', background: 'rgba(184,146,42,0.04)',
        border: '0.5px solid rgba(184,146,42,0.18)',
        padding: '13px 16px', color: '#f4efe6',
        fontSize: '14px', fontFamily: '"DM Sans"', outline: 'none',
      }}
    />
  );

  return (
    <>
      <SEO
        title="Franquicias — Sushi IWA | Lleva IWA a tu ciudad"
        description="Sushi IWA est\u00e1 en expansi\u00f3n. \u00bfQuieres llevar el mejor sushi de Monterrey a tu ciudad? Conversemos sobre franquicias."
        path="/franquicia"
      />
      <div style={{ background: '#0c0b09', minHeight: '100vh' }}>
        {/* HERO */}
        <section style={{
          position: 'relative', height: '80vh',
          display: 'flex', alignItems: 'center',
          padding: '0 clamp(24px,6vw,80px)',
          overflow: 'hidden',
        }}>
          <img src="/images/interior.jpg" alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'brightness(0.2) saturate(0.4)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(12,11,9,0.9) 0%, transparent 65%)',
          }} />
          <div style={{ position: 'relative', maxWidth: '580px' }}>
            <div style={{
              fontFamily: '"Noto Serif JP", serif',
              fontSize: '10px', fontWeight: 200,
              letterSpacing: '0.45em', color: '#b8922a',
              marginBottom: '20px',
            }}>\u3044\u308f \u00b7 Expansi\u00f3n</div>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(40px,7vw,88px)',
              fontWeight: 300, fontStyle: 'italic',
              color: '#f4efe6', lineHeight: 0.95,
              marginBottom: '24px',
            }}>
              Llevar IWA<br />
              <span style={{ color: '#d4a843' }}>a tu ciudad.</span>
            </h1>
            <p style={{
              fontSize: '14px', color: 'rgba(244,239,230,0.45)',
              lineHeight: 1.75, marginBottom: '32px',
            }}>
              5 a\u00f1os. 4 ciudades. Una sola obsesi\u00f3n.
              Sushi IWA es una marca construida para durar.
            </p>
            <a href="#form" style={{
              background: 'none',
              border: '0.5px solid rgba(184,146,42,0.4)',
              padding: '13px 28px', color: '#b8922a',
              textDecoration: 'none', fontSize: '10px',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              fontFamily: '"DM Sans"', display: 'inline-block',
            }}>Quiero saber m\u00e1s \u2192</a>
          </div>
        </section>

        {/* WHY IWA */}
        <section style={{
          padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,52px)',
          maxWidth: '1000px', margin: '0 auto',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}>
            {[
              {
                title: 'Marca establecida',
                desc: '5 a\u00f1os, 4 ciudades, 13K seguidores. Una identidad reconocida en el norte de M\u00e9xico.',
              },
              {
                title: 'Sistema probado',
                desc: 'Operaciones estandarizadas, staff portal propio, tecnolog\u00eda de reservaciones y anal\u00edticas.',
              },
              {
                title: 'Mercado desatendido',
                desc: 'El mejor japon\u00e9s premium fuera de CDMX. Ciudades con demanda y sin competencia real.',
              },
            ].map(item => (
              <div key={item.title} style={{
                padding: '28px 24px',
                border: '0.5px solid rgba(184,146,42,0.12)',
              }}>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.3em',
                  textTransform: 'uppercase', color: '#b8922a',
                  marginBottom: '12px',
                }}>{item.title}</div>
                <p style={{
                  fontSize: '13px', color: 'rgba(244,239,230,0.5)',
                  lineHeight: 1.7,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CURRENT FOOTPRINT */}
        <section style={{
          padding: '48px clamp(24px,5vw,52px)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '9px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#b8922a',
            marginBottom: '24px',
          }}>Presencia actual</div>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(20px,3vw,32px)',
            fontStyle: 'italic', color: '#f4efe6',
            marginBottom: '12px',
          }}>
            MTY &middot; Saltillo &middot; HMO &middot; Obreg\u00f3n &middot;{' '}
            <span style={{ color: 'rgba(244,239,230,0.3)' }}>Mazatl\u00e1n</span>
          </div>
          <p style={{
            fontSize: '13px', color: 'rgba(244,239,230,0.35)',
            lineHeight: 1.65,
          }}>
            5 ciudades en 5 a\u00f1os. Las siguientes ya las tenemos en mente.
          </p>
        </section>

        {/* FORM */}
        <section id="form" style={{
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,52px)',
          maxWidth: '600px', margin: '0 auto',
        }}>
          {!submitted ? (
            <>
              <div style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(28px,4vw,44px)',
                fontStyle: 'italic', color: '#f4efe6',
                marginBottom: '8px',
              }}>Conversemos.</div>
              <p style={{
                fontSize: '13px', color: '#7a7670',
                marginBottom: '28px', lineHeight: 1.65,
              }}>
                No tenemos un kit de franquicia est\u00e1ndar.
                Tenemos conversaciones con las personas correctas.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {input('name', 'Nombre completo')}
                {input('city', 'Ciudad objetivo')}
                {input('phone', 'WhatsApp', 'tel')}

                {([
                  { key: 'investment' as const, opts: ['$500K\u2013$1M MXN', '$1M\u2013$3M MXN', '$3M+ MXN', 'Por definir'], ph: 'Inversi\u00f3n disponible' },
                  { key: 'experience' as const, opts: ['Ninguna', 'Operador de restaurant', 'Inversionista', 'Ambos'], ph: 'Experiencia en restaurantes' },
                ]).map(({ key, opts, ph }) => (
                  <select key={key} value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{
                      width: '100%', background: '#0c0b09',
                      border: '0.5px solid rgba(184,146,42,0.18)',
                      padding: '13px 16px',
                      color: form[key] ? '#f4efe6' : '#7a7670',
                      fontSize: '14px', fontFamily: '"DM Sans"',
                      outline: 'none', cursor: 'pointer',
                    }}
                  >
                    <option value="">{ph}</option>
                    {opts.map(o => <option key={o} value={o} style={{ background: '#0c0b09' }}>{o}</option>)}
                  </select>
                ))}

                <textarea
                  placeholder="\u00bfPor qu\u00e9 quieres llevar IWA a tu ciudad? (opcional)"
                  value={form.why}
                  onChange={e => setForm(f => ({ ...f, why: e.target.value.slice(0, 200) }))}
                  rows={3}
                  style={{
                    width: '100%', background: 'rgba(184,146,42,0.04)',
                    border: '0.5px solid rgba(184,146,42,0.18)',
                    padding: '13px 16px', color: '#f4efe6',
                    fontSize: '14px', fontFamily: '"DM Sans"',
                    outline: 'none', resize: 'none',
                  }}
                />

                <button onClick={handleSubmit} disabled={loading || !form.name || !form.phone}
                  style={{
                    background: (form.name && form.phone) ? '#b8922a' : 'rgba(184,146,42,0.2)',
                    border: 'none', padding: '14px 32px',
                    color: (form.name && form.phone) ? '#0c0b09' : '#7a7670',
                    fontSize: '11px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    fontWeight: 500, fontFamily: '"DM Sans"',
                  }}
                >{loading ? 'Enviando...' : 'Iniciar conversaci\u00f3n \u2192'}</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Noto Serif JP", serif', fontSize: '36px', color: '#b8922a', marginBottom: '16px' }}>\u3044\u308f</div>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '26px', fontStyle: 'italic', color: '#f4efe6', marginBottom: '8px' }}>Recibido, {form.name}.</div>
              <p style={{ fontSize: '13px', color: '#7a7670', lineHeight: 1.65 }}>Revisaremos tu informaci\u00f3n y nos pondremos en contacto contigo en los pr\u00f3ximos d\u00edas.</p>
            </div>
          )}
        </section>

        {/* FOOTER NOTE */}
        <div style={{
          textAlign: 'center',
          padding: '40px 24px 60px',
          borderTop: '0.5px solid rgba(184,146,42,0.08)',
        }}>
          <p style={{
            fontSize: '11px', color: 'rgba(244,239,230,0.25)',
            lineHeight: 1.65, maxWidth: '400px', margin: '0 auto',
          }}>
            Sushi IWA no tiene un programa de franquicia masivo.
            Revisamos cada oportunidad individualmente. \u3044\u308f
          </p>
        </div>
      </div>
    </>
  );
}
