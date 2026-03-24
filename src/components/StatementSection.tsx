import { Link } from 'react-router-dom';

interface Props {
  word?: string;
  subtitle?: string;
  cta?: { label: string; href: string } | null;
}

export default function StatementSection({
  word = 'Curricanes.',
  subtitle = 'El platillo que define a IWA.',
  cta = { label: 'Ver el Menú Completo →', href: '/menu' },
}: Props) {
  return (
    <section style={{
      padding: 'clamp(80px,10vw,140px) 0',
      overflow: 'hidden',
      position: 'relative',
      background: '#0c0b09',
      textAlign: 'center',
    }}>
      {/* Hairline gold rules */}
      <div style={{
        position: 'absolute', top: 0, left: '5%', right: '5%',
        height: '0.5px', background: 'rgba(184,146,42,0.15)',
      }} />

      {/* Giant Japanese watermark behind */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', userSelect: 'none',
        overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: '"Noto Serif JP", serif',
          fontSize: 'clamp(180px,30vw,360px)',
          fontWeight: 200,
          color: 'rgba(184,146,42,0.04)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>いわ</span>
      </div>

      {/* Small label */}
      <div style={{
        fontFamily: '"DM Sans"',
        fontSize: '9px', letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'rgba(184,146,42,0.5)',
        marginBottom: '32px',
        position: 'relative',
      }}>San Pedro Garza García · Monterrey</div>

      {/* THE BIG WORD */}
      <div
        data-reveal
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(72px,14vw,180px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#f4efe6',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          position: 'relative',
          whiteSpace: 'nowrap',
        }}
      >
        {word}
      </div>

      {/* Body line */}
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(16px,2.2vw,24px)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'rgba(244,239,230,0.45)',
        marginTop: '28px',
        letterSpacing: '0.06em',
        position: 'relative',
      }}>
        {subtitle}
      </div>

      {/* CTA */}
      {cta && (
        <div style={{ marginTop: '40px', position: 'relative' }}>
          <Link
            to={cta.href}
            style={{
              fontFamily: '"DM Sans"',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#b8922a',
              textDecoration: 'none',
              borderBottom: '0.5px solid rgba(184,146,42,0.4)',
              paddingBottom: '3px',
            }}
          >
            {cta.label}
          </Link>
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: 0, left: '5%', right: '5%',
        height: '0.5px', background: 'rgba(184,146,42,0.15)',
      }} />
    </section>
  );
}
