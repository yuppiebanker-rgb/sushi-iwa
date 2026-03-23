const PRESS = [
  { name: 'Milenio', type: 'media', quote: '"El mejor omakase de SPGG"' },
  { name: 'El Norte', type: 'media', quote: '"Una experiencia transformadora"' },
  { name: 'Infobae', type: 'media', quote: '"Destino gastronómico imperdible"' },
  { name: 'Food & Travel MX', type: 'media', quote: '"Top 10 Restaurantes MTY 2024"' },
  { name: 'Top Restaurant MTY', type: 'award', year: '2024' },
  { name: 'Mejor Japonés SPGG', type: 'award', year: '2024' },
  { name: '4.6 ★ Google', type: 'rating', count: '847 reseñas' },
  { name: '@sushi.iwa', type: 'social', count: '13K seguidores' },
] as const;

export default function PressStrip() {
  return (
    <div style={{
      borderTop: '0.5px solid rgba(184,146,42,0.12)',
      borderBottom: '0.5px solid rgba(184,146,42,0.12)',
      padding: '22px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
        background: 'linear-gradient(to right, #0c0b09, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
        background: 'linear-gradient(to left, #0c0b09, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <div style={{
        display: 'flex', gap: '0',
        animation: 'pressScroll 30s linear infinite',
        width: 'max-content',
      }}>
        {/* Duplicate for seamless loop */}
        {[...PRESS, ...PRESS].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '0 36px',
            borderRight: '0.5px solid rgba(184,146,42,0.12)',
            whiteSpace: 'nowrap',
          }}>
            {item.type === 'award' && (
              <span style={{ color: '#b8922a', fontSize: '12px' }}>&#10022;</span>
            )}
            <span style={{
              fontFamily: item.type === 'media'
                ? '"Cormorant Garamond", serif'
                : '"DM Sans", sans-serif',
              fontSize: item.type === 'media' ? '15px' : '12px',
              fontWeight: item.type === 'media' ? 300 : 400,
              color: '#f4efe6',
              letterSpacing: item.type === 'media' ? '0.05em' : '0.15em',
              textTransform: item.type === 'media' ? 'none' : 'uppercase',
            }}>{item.name}</span>
            {'quote' in item && item.quote && (
              <span style={{
                fontSize: '10px', color: '#7a7670',
                fontStyle: 'italic',
                fontFamily: '"Cormorant Garamond", serif',
              }}>{item.quote}</span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pressScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="pressScroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
