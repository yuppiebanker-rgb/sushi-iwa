interface Props {
  label: string;
  labelJp?: string;
  number?: string;
}

export default function SectionDivider({ label, labelJp, number }: Props) {
  return (
    <div data-reveal style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: 'clamp(40px, 5vw, 64px)',
      padding: '0 var(--page-h-pad, 52px)',
    }}>
      {number && (
        <span style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '11px',
          color: 'rgba(184,146,42,0.3)',
          letterSpacing: '0.1em',
        }}>{number}</span>
      )}

      <div className="line-draw" style={{ flex: 1, maxWidth: '48px' }} />

      <div style={{ textAlign: 'center' }}>
        {labelJp && (
          <div style={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '9px',
            fontWeight: 200,
            letterSpacing: '0.4em',
            color: 'rgba(184,146,42,0.45)',
            marginBottom: '4px',
          }}>{labelJp}</div>
        )}
        <span style={{
          fontFamily: '"DM Sans"',
          fontSize: '8.5px',
          fontWeight: 400,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#b8922a',
        }}>{label}</span>
      </div>

      <div className="line-draw" style={{ flex: 1, maxWidth: '48px' }} />
    </div>
  );
}
