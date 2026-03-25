import { useState } from 'react';

export const BOOKING_LINKS = {
  instagram_bio: 'https://sushiiwa.mx/#reservar',
  instagram_story: 'https://sushiiwa.mx/#reservar?utm_source=instagram&utm_medium=story',
  google_maps: 'https://sushiiwa.mx/#reservar?utm_source=google&utm_medium=maps',
  whatsapp: 'https://wa.me/528111239849?text=Hola!%20Quisiera%20hacer%20una%20reservaci%C3%B3n%20en%20Sushi%20IWA.',
};

export default function GoogleReserveLinks() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (key: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        fontSize: '12px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#b8922a',
        marginBottom: '16px',
      }}>Links de Reservación</div>

      {Object.entries(BOOKING_LINKS).map(([key, url]) => (
        <div key={key} style={{
          display: 'flex', gap: '10px', alignItems: 'center',
          padding: '10px 0',
          borderBottom: '0.5px solid rgba(184,146,42,0.1)',
          marginBottom: '8px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '11px', fontWeight: 500,
              color: '#f4efe6', marginBottom: '2px',
              textTransform: 'capitalize',
            }}>{key.replace(/_/g, ' ')}</div>
            <div style={{
              fontSize: '10px', color: '#7a7670',
              wordBreak: 'break-all',
            }}>{url}</div>
          </div>
          <button
            onClick={() => copy(key, url)}
            style={{
              background: copied === key ? 'rgba(34,197,94,0.15)' : 'rgba(184,146,42,0.1)',
              border: `0.5px solid ${copied === key ? '#22c55e' : 'rgba(184,146,42,0.2)'}`,
              color: copied === key ? '#4ade80' : '#b8922a',
              padding: '6px 14px', cursor: 'pointer',
              fontSize: '10px', letterSpacing: '0.15em',
              fontFamily: '"DM Sans"', minHeight: '36px',
              transition: 'all 0.2s',
            }}
          >{copied === key ? '✓ Copiado' : 'Copiar'}</button>
        </div>
      ))}

      <div style={{
        marginTop: '16px', padding: '12px',
        background: 'rgba(59,130,246,0.06)',
        border: '0.5px solid rgba(59,130,246,0.2)',
        fontSize: '11px', color: '#7a7670', lineHeight: 1.65,
      }}>
        <strong style={{ color: '#93c5fd' }}>Para Instagram:</strong><br/>
        1. Ve a tu perfil → Editar perfil → Sitio web<br/>
        2. Pega el link de Instagram Bio arriba<br/>
        3. En stories: usa el sticker "Link" y pega Instagram Story link
      </div>
    </div>
  );
}
