interface Props {
  singleRow?: boolean;
}

export default function AmbientTicker({ singleRow = false }: Props) {
  const ROW1 = 'いわ · SUSHI IWA · SAN PEDRO · MONTERREY · 寿司 · COCINA JAPONESA · いわ · SUSHI IWA · SAN PEDRO · MONTERREY · 寿司 · COCINA JAPONESA · ';
  const ROW2 = 'CURRICANES · SASHIMI · NIGIRIS · HAMACHI · TEMAKI · SAKE · SALMÓN · ROLLOS · OMAKASE · CURRICANES · SASHIMI · NIGIRIS · HAMACHI · TEMAKI · SAKE · ';

  return (
    <div style={{
      background: '#0c0b09',
      borderTop: '0.5px solid rgba(184,146,42,0.1)',
      borderBottom: '0.5px solid rgba(184,146,42,0.1)',
      overflow: 'hidden',
      padding: '18px 0',
      userSelect: 'none',
    }}>
      {/* Row 1 — scrolls left, gold tones */}
      <div style={{
        display: 'flex',
        overflow: 'hidden',
        marginBottom: singleRow ? 0 : '10px',
      }}>
        <div style={{
          display: 'flex',
          animation: 'tickerLeft 45s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(18px,2.2vw,26px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(184,146,42,0.38)',
              paddingRight: '0',
            }}>{ROW1}</span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right, cream tones */}
      {!singleRow && (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            animation: 'tickerRight 32s linear infinite',
            whiteSpace: 'nowrap',
          }}>
            {[...Array(3)].map((_, i) => (
              <span key={i} style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 'clamp(9px,1.1vw,13px)',
                fontWeight: 300,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,230,0.16)',
                paddingRight: '0',
              }}>{ROW2}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
