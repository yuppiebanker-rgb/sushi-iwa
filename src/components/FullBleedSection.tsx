interface Props {
  imageSrc: string;
  imageAlt: string;
  topLabel?: string;
  headline: string;
  subline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  align?: 'left' | 'center' | 'right';
  overlayPosition?: 'bottom-left' | 'center' | 'bottom-right';
}

export default function FullBleedSection({
  imageSrc,
  imageAlt,
  topLabel,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  overlayPosition = 'bottom-left',
}: Props) {
  const posStyles: Record<string, React.CSSProperties> = {
    'bottom-left': { bottom: 'clamp(40px,6vw,80px)', left: 'clamp(24px,5vw,72px)' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' },
    'bottom-right': { bottom: 'clamp(40px,6vw,80px)', right: 'clamp(24px,5vw,72px)', textAlign: 'right' },
  };

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      marginLeft: 'calc(-1 * var(--page-margin, 0px))',
      height: 'clamp(400px, 80vh, 820px)',
      overflow: 'hidden',
    }}>
      {/* Full-bleed photo */}
      <img
        src={`/images/${imageSrc}.jpg`}
        alt={imageAlt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.55) saturate(0.8)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: overlayPosition === 'center'
          ? 'radial-gradient(ellipse at center, rgba(12,11,9,0.3) 0%, rgba(12,11,9,0.6) 100%)'
          : overlayPosition === 'bottom-left'
            ? 'linear-gradient(to top right, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.1) 60%)'
            : 'linear-gradient(to top left, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.1) 60%)',
      }} />

      {/* Text content */}
      <div style={{
        position: 'absolute',
        maxWidth: '520px',
        ...posStyles[overlayPosition],
      }}>
        {topLabel && (
          <div style={{
            fontFamily: '"DM Sans"',
            fontSize: '9px',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(184,146,42,0.7)',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '0.5px', background: 'rgba(184,146,42,0.7)' }} />
            {topLabel}
          </div>
        )}

        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(38px,5.5vw,72px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#f4efe6',
          lineHeight: 1.0,
          marginBottom: '16px',
          letterSpacing: '-0.01em',
        }}>{headline}</h2>

        {subline && (
          <p style={{
            fontFamily: '"DM Sans"',
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(244,239,230,0.55)',
            lineHeight: 1.75,
            marginBottom: '28px',
          }}>{subline}</p>
        )}

        {ctaLabel && ctaHref && (
          <a href={ctaHref} style={{
            fontFamily: '"DM Sans"',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#b8922a',
            textDecoration: 'none',
            borderBottom: '0.5px solid rgba(184,146,42,0.45)',
            paddingBottom: '3px',
            transition: 'color 0.2s',
          }}>{ctaLabel} →</a>
        )}
      </div>
    </section>
  );
}
