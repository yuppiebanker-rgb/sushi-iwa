export default function SeasonalBadge({ show }: { show?: boolean }) {
  if (!show) return null;
  return <span style={{ fontSize: 7, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#b8922a', border: '0.5px solid rgba(184,146,42,0.3)', padding: '1px 6px', marginLeft: 6 }}>De temporada</span>;
}
