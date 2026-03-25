import { LOCATIONS, useLocation_ } from '../../lib/location-context';
import LocationSelector from '../../components/staff/LocationSelector';
import './staff.css';

export default function MultiLocation() {
  const { locationId } = useLocation_();

  return (
    <div>
      <LocationSelector />

      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Sucursales</div>
          <h1 className="sp-title">Multi-Sucursal</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {LOCATIONS.map(loc => {
          const isActive = loc.id === locationId;
          let resCount = 0;
          let wlCount = 0;
          let eightySixCount = 0;
          const today = new Date().toISOString().slice(0, 10);

          try { resCount = (JSON.parse(localStorage.getItem(`iwa-res-${loc.id}-${today}`) || '[]') as Array<{ status: string }>).filter(r => r.status !== 'cancelada').length; } catch { /* */ }
          try { wlCount = (JSON.parse(localStorage.getItem(`iwa-wl-${loc.id}-${today}`) || '[]') as unknown[]).length; } catch { /* */ }
          try { eightySixCount = Object.values(JSON.parse(localStorage.getItem(`iwa-86-${loc.id}`) || '{}')).filter(Boolean).length; } catch { /* */ }

          return (
            <div key={loc.id} className="sp-card" style={{
              borderLeft: `3px solid ${loc.color}`,
              opacity: isActive ? 1 : 0.7,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: loc.color }} />
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 16, color: 'var(--cream)' }}>{loc.name}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: loc.color, marginLeft: 'auto' }}>{loc.short}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 11 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: 18, color: 'var(--cream)' }}>{resCount}</div>
                  <div style={{ color: 'var(--mist)', fontSize: 9 }}>Reservaciones</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: 18, color: 'var(--cream)' }}>{wlCount}</div>
                  <div style={{ color: 'var(--mist)', fontSize: 9 }}>En espera</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: 18, color: eightySixCount > 0 ? '#c66' : 'var(--cream)' }}>{eightySixCount}</div>
                  <div style={{ color: 'var(--mist)', fontSize: 9 }}>86'd</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
