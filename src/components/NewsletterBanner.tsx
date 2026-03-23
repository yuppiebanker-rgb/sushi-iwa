import { useState } from 'react';

export default function NewsletterBanner() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!phone.trim()) return;
    const msg = encodeURIComponent(
      `Hola IWA! Me gustaría unirme a las Novedades IWA para recibir actualizaciones, menú de temporada y eventos exclusivos.\nMi número: ${phone}`
    );
    window.open(`https://wa.me/528111239849?text=${msg}`, '_blank');
    setSent(true);
  };

  return (
    <section style={{
      background: '#16140f',
      borderTop: '0.5px solid rgba(184,146,42,0.15)',
      borderBottom: '0.5px solid rgba(184,146,42,0.15)',
      padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 52px)',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: '10px',
        fontWeight: 200,
        letterSpacing: '0.5em',
        color: '#b8922a',
        marginBottom: '16px',
      }}>お知らせ</div>
      <h2 style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 300,
        color: '#f4efe6',
        marginBottom: '12px',
        lineHeight: 1.15,
      }}>Novedades IWA</h2>
      <p style={{
        fontSize: '14px',
        color: '#7a7670',
        marginBottom: '32px',
        lineHeight: 1.6,
        maxWidth: '480px',
        margin: '0 auto 32px',
      }}>
        Sé el primero en conocer el menú de temporada, eventos exclusivos y reservaciones anticipadas.
      </p>
      {sent ? (
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '22px',
          color: '#b8922a',
          fontStyle: 'italic',
        }}>
          ¡Bienvenido al Club IWA · いわ!
        </div>
      ) : (
        <div style={{
          display: 'flex',
          gap: '0',
          maxWidth: '440px',
          margin: '0 auto',
          flexWrap: 'wrap' as const,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(184,146,42,0.06)',
            border: '0.5px solid rgba(184,146,42,0.25)',
            borderRight: 'none',
            padding: '0 16px',
            fontSize: '13px',
            color: '#7a7670',
            flexShrink: 0,
          }}>+52</div>
          <input
            type="tel"
            placeholder="Tu número de WhatsApp"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              flex: 1,
              minWidth: '200px',
              background: 'rgba(184,146,42,0.04)',
              border: '0.5px solid rgba(184,146,42,0.25)',
              color: '#f4efe6',
              padding: '14px 16px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: '"DM Sans", sans-serif',
            }}
          />
          <button onClick={handleSubmit} style={{
            background: '#b8922a',
            color: '#0c0b09',
            border: 'none',
            padding: '14px 24px',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            whiteSpace: 'nowrap' as const,
            transition: 'background 0.2s ease',
          }}>Unirme →</button>
        </div>
      )}
      <p style={{
        fontSize: '10px',
        color: '#7a7670',
        marginTop: '16px',
        letterSpacing: '0.05em',
      }}>
        Solo enviamos mensajes cuando hay algo que vale la pena.
      </p>
    </section>
  );
}
