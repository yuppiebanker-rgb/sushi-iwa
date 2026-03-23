const AWARDS = [
  { label: 'Top Restaurant', sub: 'Monterrey 2024' },
  { label: 'Best Japanese', sub: 'San Pedro 2024' },
  { label: '4.6 \u2605', sub: '847 Google Reviews' },
  { label: '13K', sub: 'Instagram Followers' },
];

export default function AwardsBadges() {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap',
      gap: '1px', margin: '0',
      background: 'rgba(184,146,42,0.1)',
    }}>
      {AWARDS.map((award, i) => (
        <div key={i} style={{
          flex: '1 1 150px',
          padding: '20px 24px',
          background: '#0c0b09',
          textAlign: 'center',
          borderRight: i < AWARDS.length - 1 ? '0.5px solid rgba(184,146,42,0.12)' : 'none',
        }}>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '22px', fontWeight: 300,
            color: '#b8922a', marginBottom: '4px',
          }}>{award.label}</div>
          <div style={{
            fontSize: '9px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#7a7670',
          }}>{award.sub}</div>
        </div>
      ))}
    </div>
  );
}
