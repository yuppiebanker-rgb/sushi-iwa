import { LOCATIONS, useLocation_ } from '../../lib/location-context';

export default function LocationSelector() {
  const { locationId, location, setLocationId } = useLocation_();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px 12px',
      background: 'rgba(184,146,42,0.06)',
      border: '0.5px solid rgba(184,146,42,0.15)',
      marginBottom: '16px',
    }}>
      <div style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: location.color, flexShrink: 0,
      }}/>
      <span style={{
        fontSize: '10px', color: '#7a7670',
        letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>Sucursal</span>
      <select
        value={locationId}
        onChange={e => setLocationId(e.target.value)}
        style={{
          background: 'transparent', border: 'none',
          color: '#f4efe6', fontSize: '13px',
          fontFamily: '"DM Sans"', cursor: 'pointer',
          outline: 'none', padding: '0 4px',
        }}
      >
        {LOCATIONS.map(loc => (
          <option key={loc.id} value={loc.id}
            style={{ background: '#0c0b09' }}>
            {loc.name}
          </option>
        ))}
      </select>
      <div style={{
        marginLeft: 'auto', fontSize: '9px',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: location.color,
      }}>{location.short}</div>
    </div>
  );
}
