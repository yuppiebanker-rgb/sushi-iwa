import { useRef, useEffect } from 'react';

const SIGNATURES = [
  {
    name: 'Curricanes de Salmón',
    jp: 'くりかね',
    desc: 'El platillo que define a IWA. Salmón canadiense en cucharas japonesas.',
    price: '$325',
    img: 'curricanes-salmon',
    badge: 'Firma',
  },
  {
    name: 'Hamachi Jalapeño',
    jp: '刺身',
    desc: 'Yellowtail fresco con jalapeño serrano. El más pedido desde el primer día.',
    price: '$325',
    img: 'hamachi-jalap',
    badge: 'Firma',
  },
  {
    name: 'No Name Roll',
    jp: 'ノーネーム',
    desc: 'Aguacate, cangrejo, salmón spicy. Sin nombre porque no lo necesita.',
    price: '$385',
    img: 'no-name',
    badge: 'Legendario',
  },
  {
    name: 'IWA Roll',
    jp: 'いわロール',
    desc: 'Callo de hacha, aguacate, pasta de cangrejo, lajas de atún. Sin gluten.',
    price: '$310',
    img: 'iwa-roll',
    badge: 'Gluten Free',
  },
  {
    name: 'Hamachi Curry',
    jp: 'カリー',
    desc: 'Yellowtail con un toque de curry japonés. Suave, complejo, inolvidable.',
    price: '$325',
    img: 'hamachi-jalap2',
    badge: 'Temporada',
  },
  {
    name: 'Rainbow Roll',
    jp: 'レインボー',
    desc: 'Camarón, queso crema, cangrejo — cubierto de atún, salmón y robalo.',
    price: '$275',
    img: 'rainbow-roll',
    badge: 'Especial',
  },
];

export default function HorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Desktop: wheel → horizontal scroll
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const atStart = track.scrollLeft === 0;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      track.scrollLeft += e.deltaY * 1.5;
    };

    track.addEventListener('wheel', onWheel, { passive: false });
    return () => track.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section style={{
      padding: 'clamp(60px,8vw,100px) 0',
      overflow: 'hidden',
      background: '#0c0b09',
    }}>
      {/* Section label */}
      <div style={{
        padding: '0 clamp(20px,5vw,72px)',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#b8922a',
            marginBottom: '8px',
          }}>
            Platillos Firma
          </div>
          <div style={{
            fontFamily: '"Cormorant Garamond",serif',
            fontSize: 'clamp(24px,3.5vw,42px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f4efe6',
          }}>Lo que nos define</div>
        </div>
        <div style={{
          fontSize: '10px',
          color: 'rgba(184,146,42,0.5)',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>&larr;</span> desliza <span>&rarr;</span>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '2px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          padding: '0 clamp(20px,5vw,72px)',
          paddingRight: 'clamp(20px,5vw,72px)',
        }}
        className="hide-scrollbar"
      >
        {SIGNATURES.map((dish, i) => (
          <div key={dish.name} style={{
            flexShrink: 0,
            width: 'clamp(260px, 32vw, 380px)',
            background: '#141210',
            border: '0.5px solid rgba(184,146,42,0.12)',
            cursor: 'pointer',
            transition: 'border-color 0.25s ease',
            animationDelay: `${i * 60}ms`,
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(184,146,42,0.35)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(184,146,42,0.12)')}
          >
            {/* Photo */}
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={`/images/${dish.img}.jpg`} alt={dish.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.75) saturate(0.85)',
                  transition: 'filter 0.4s ease, transform 0.55s ease',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLImageElement).style.filter = 'brightness(0.95) saturate(1)';
                  (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLImageElement).style.filter = 'brightness(0.75) saturate(0.85)';
                  (e.target as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '20px 22px 22px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px',
              }}>
                <div style={{
                  fontSize: '8px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#b8922a',
                }}>{dish.badge}</div>
                <div style={{
                  fontFamily: '"Noto Serif JP",serif',
                  fontSize: '10px',
                  fontWeight: 200,
                  color: 'rgba(184,146,42,0.4)',
                }}>{dish.jp}</div>
              </div>
              <div style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: '22px',
                fontWeight: 300,
                color: '#f4efe6',
                marginBottom: '10px',
                lineHeight: 1.15,
              }}>{dish.name}</div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(244,239,230,0.38)',
                lineHeight: 1.65,
                marginBottom: '16px',
              }}>{dish.desc}</div>
              <div style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: '20px',
                color: '#b8922a',
              }}>{dish.price}</div>
            </div>
          </div>
        ))}

        {/* End card — View full menu */}
        <div style={{
          flexShrink: 0,
          width: 'clamp(200px,22vw,280px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '40px',
          border: '0.5px solid rgba(184,146,42,0.12)',
          background: 'transparent',
        }}>
          <div style={{
            fontFamily: '"Noto Serif JP",serif',
            fontSize: '32px',
            color: 'rgba(184,146,42,0.3)',
          }}>いわ</div>
          <a href="/menu" style={{
            fontFamily: '"DM Sans"',
            fontSize: '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#b8922a',
            textDecoration: 'none',
            border: '0.5px solid rgba(184,146,42,0.35)',
            padding: '12px 20px',
          }}>Ver Menú Completo &rarr;</a>
        </div>
      </div>
    </section>
  );
}
