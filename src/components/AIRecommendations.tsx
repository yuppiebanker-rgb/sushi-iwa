import { useMemo } from 'react';
import { getContext, getRecommendation } from '../lib/recommendations';
import { MENU_ITEMS } from '../data/menu';

export default function AIRecommendations({
  variant = 'inline',
}: {
  variant?: 'inline' | 'sidebar';
}) {
  const rec = useMemo(() => getRecommendation(getContext()), []);
  const items = MENU_ITEMS.filter(i => rec.items.includes(i.id)).slice(0, 3);

  if (!items.length) return null;

  return (
    <div style={{
      background: '#141210',
      border: '0.5px solid rgba(184,146,42,0.15)',
      padding: variant === 'sidebar' ? '16px' : '24px clamp(20px,5vw,52px)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '16px',
      }}>
        <div style={{
          fontFamily: '"Noto Serif JP", serif',
          fontSize: '12px', color: '#b8922a', fontWeight: 200,
        }}>いわ</div>
        <div>
          <div style={{
            fontSize: '9px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#b8922a',
          }}>{rec.title}</div>
          <div style={{ fontSize: '11px', color: '#7a7670', marginTop: '2px' }}>
            {rec.reason}
          </div>
        </div>
        {rec.urgency && (
          <div style={{
            marginLeft: 'auto',
            fontSize: '9px', letterSpacing: '0.1em',
            color: '#b8922a',
            background: 'rgba(184,146,42,0.1)',
            padding: '3px 8px',
          }}>{rec.urgency}</div>
        )}
      </div>

      {/* Items */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: variant === 'sidebar' ? '1fr' : 'repeat(3,1fr)',
        gap: '8px',
      }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex', gap: '10px', alignItems: 'center',
            padding: '8px',
            background: 'rgba(184,146,42,0.03)',
            border: '0.5px solid rgba(184,146,42,0.08)',
            cursor: 'pointer',
          }}>
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              style={{
                width: '48px', height: '48px',
                objectFit: 'cover',
                flexShrink: 0,
                filter: 'brightness(0.8)',
              }}
            />
            <div>
              <div style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '14px', color: '#f4efe6',
                lineHeight: 1.2,
              }}>{item.name}</div>
              <div style={{
                fontSize: '12px', color: '#b8922a',
                marginTop: '2px',
              }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
