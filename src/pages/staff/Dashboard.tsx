import { useState } from 'react';
import { Link } from 'react-router-dom';
import './staff.css';

const LOCS = ['Monterrey', 'Saltillo', 'Hermosillo', 'Cd. Obregón'];

function getStoredLoc() {
  return localStorage.getItem('iwa-staff-loc') || LOCS[0];
}

export default function Dashboard() {
  const [loc, setLoc] = useState(getStoredLoc);
  const changeLoc = (v: string) => { setLoc(v); localStorage.setItem('iwa-staff-loc', v); };

  const eightySixCount = (() => {
    try { return Object.values(JSON.parse(localStorage.getItem('iwa-86') || '{}')).filter(Boolean).length; } catch { return 0; }
  })();

  const reservations = (() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      return (JSON.parse(localStorage.getItem(`iwa-res-${today}`) || '[]') as Array<{ status: string }>).filter(r => r.status !== 'cancelada');
    } catch { return []; }
  })();

  const waitlist = (() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      return JSON.parse(localStorage.getItem(`iwa-wl-${loc}-${today}`) || '[]') as Array<{ name: string; size: number }>;
    } catch { return []; }
  })();

  return (
    <div>
      <div className="sp-loc-select">
        <select className="sp-select" value={loc} onChange={e => changeLoc(e.target.value)}>
          {LOCS.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Dashboard</div>
          <h1 className="sp-title">Hoy en {loc}</h1>
        </div>
      </div>

      <div className="sp-metrics">
        <div className="sp-metric"><div className="sp-metric-val">{reservations.length}</div><div className="sp-metric-label">Reservaciones Hoy</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{waitlist.length}</div><div className="sp-metric-label">En Lista de Espera</div></div>
        <div className="sp-metric"><div className="sp-metric-val">—</div><div className="sp-metric-label">Mesas Ocupadas</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{eightySixCount}</div><div className="sp-metric-label">Platillos 86'd</div></div>
      </div>

      <div className="sp-quick">
        <Link to="/iwa-staff/reservations" className="sp-btn sp-btn--gold">+ Reservación</Link>
        <Link to="/iwa-staff/waitlist" className="sp-btn">+ Lista de Espera</Link>
        <Link to="/iwa-staff/floor" className="sp-btn">Ver Piso</Link>
        <Link to="/iwa-staff/86" className="sp-btn">86 Board</Link>
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
