import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation_ } from '../../lib/location-context';
import LocationSelector from '../../components/staff/LocationSelector';
import './staff.css';

const updateAvailability = (locationId: string, available: number) => {
  localStorage.setItem(`iwa_availability_${locationId}`, JSON.stringify({
    mesas: available,
    timestamp: Date.now(),
  }));
};

export default function Dashboard() {
  const { locationId, location } = useLocation_();
  const [mesasDisp, setMesasDisp] = useState(() => {
    try {
      const d = localStorage.getItem(`iwa_availability_${locationId}`);
      return d ? JSON.parse(d).mesas : 8;
    } catch { return 8; }
  });
  const changeMesas = (n: number) => { setMesasDisp(n); updateAvailability(locationId, n); };

  const eightySixCount = (() => {
    try { return Object.values(JSON.parse(localStorage.getItem(`iwa-86-${locationId}`) || '{}')).filter(Boolean).length; } catch { return 0; }
  })();

  const reservations = (() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      return (JSON.parse(localStorage.getItem(`iwa-res-${locationId}-${today}`) || '[]') as Array<{ status: string }>).filter(r => r.status !== 'cancelada');
    } catch { return []; }
  })();

  const waitlist = (() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      return JSON.parse(localStorage.getItem(`iwa-wl-${locationId}-${today}`) || '[]') as Array<{ name: string; size: number }>;
    } catch { return []; }
  })();

  return (
    <div>
      <LocationSelector />

      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Dashboard</div>
          <h1 className="sp-title">Hoy en {location.name}</h1>
        </div>
      </div>

      <div className="sp-metrics">
        <div className="sp-metric"><div className="sp-metric-val">{reservations.length}</div><div className="sp-metric-label">Reservaciones Hoy</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{waitlist.length}</div><div className="sp-metric-label">En Lista de Espera</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{mesasDisp}</div><div className="sp-metric-label">Mesas Disponibles</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{eightySixCount}</div><div className="sp-metric-label">Platillos 86'd</div></div>
      </div>

      <div className="sp-quick">
        <Link to="/iwa-staff/reservations" className="sp-btn sp-btn--gold">+ Reservación</Link>
        <Link to="/iwa-staff/waitlist" className="sp-btn">+ Lista de Espera</Link>
        <Link to="/iwa-staff/floor" className="sp-btn">Ver Piso</Link>
        <Link to="/iwa-staff/86" className="sp-btn">86 Board</Link>
      </div>

      <div className="sp-card" style={{ marginTop: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 300, color: 'var(--cream)', fontSize: 16, marginBottom: 10 }}>Mesas disponibles (público)</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[0,1,2,3,4,5,6,7,8].map(n => (
            <button key={n} className={`sp-btn${mesasDisp === n ? ' sp-btn--gold' : ''}`} style={{ minWidth: 40 }} onClick={() => changeMesas(n)}>{n}</button>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--mist)', marginTop: 8 }}>Se muestra como indicador de disponibilidad en la página pública.</p>
      </div>

      <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 300, color: 'var(--cream)', fontSize: 18, marginBottom: 12 }}>Próximas reservaciones</h3>
      {reservations.length === 0 ? (
        <p style={{ fontSize: 12, color: 'var(--mist)' }}>No hay reservaciones para hoy.</p>
      ) : (
        reservations.slice(0, 5).map((r: any, i: number) => (
          <div className="sp-card" key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: 'var(--cream)', fontFamily: 'var(--font-d)', fontSize: 16 }}>{r.name}</strong>
                <div style={{ fontSize: 11, color: 'var(--mist)' }}>{r.time} · {r.people} personas</div>
              </div>
              <span className={`sp-badge sp-badge--${r.status === 'confirmada' ? 'green' : r.status === 'cancelada' ? 'red' : 'yellow'}`}>{r.status}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
