import { useState, useEffect } from 'react';
import './staff.css';

type SeatStatus = 'available' | 'occupied' | 'reserved';
interface Seat { status: SeatStatus; party?: number; name?: string; time?: string; }

const TOTAL_BAR = 12;
const TABLES = ['A', 'B', 'C', 'D'];
const STORAGE_KEY = 'iwa-floor-mty';

function defaultFloor(): Record<string, Seat> {
  const m: Record<string, Seat> = {};
  for (let i = 1; i <= TOTAL_BAR; i++) m[`bar-${i}`] = { status: 'available' };
  for (const t of TABLES) m[`table-${t}`] = { status: 'available' };
  return m;
}

const NEXT: Record<SeatStatus, SeatStatus> = { available: 'occupied', occupied: 'reserved', reserved: 'available' };
const COLORS: Record<SeatStatus, string> = { available: '#3a9', occupied: '#c66', reserved: 'var(--gold)' };

export default function FloorMap() {
  const [floor, setFloor] = useState<Record<string, Seat>>(defaultFloor);

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); if (d) setFloor(d); } catch { /* */ }
  }, []);

  const save = (next: Record<string, Seat>) => { setFloor(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); };

  const toggle = (id: string) => {
    const seat = floor[id];
    const nextStatus = NEXT[seat.status];
    const updated: Seat = { status: nextStatus };
    if (nextStatus === 'occupied') {
      const party = prompt('Personas:');
      if (!party) return;
      updated.party = +party;
      updated.time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    } else if (nextStatus === 'reserved') {
      const name = prompt('Nombre de reservación:');
      if (!name) return;
      updated.name = name;
      updated.time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    }
    save({ ...floor, [id]: updated });
  };

  const resetFloor = () => {
    if (confirm('¿Resetear todo el piso? Esto eliminará todos los estados.')) {
      save(defaultFloor());
    }
  };

  const covers = Object.values(floor).filter(s => s.status === 'occupied').reduce((a, s) => a + (s.party || 1), 0);
  const total = TOTAL_BAR + TABLES.length * 4;

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Floor · Monterrey</div>
          <h1 className="sp-title">Mapa del Piso</h1>
        </div>
        <button className="sp-btn sp-btn--red" onClick={resetFloor}>Reset Floor</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontFamily: 'var(--font-d)', fontSize: 28, color: 'var(--gold)' }}>{covers}</span>
        <span style={{ fontSize: 12, color: 'var(--mist)' }}> / {total} cubiertos</span>
      </div>

      {/* LEGEND */}
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 24, fontSize: 10, color: 'var(--mist)' }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#3a9', borderRadius: '50%', marginRight: 4, verticalAlign: 'middle' }} />Disponible</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#c66', borderRadius: '50%', marginRight: 4, verticalAlign: 'middle' }} />Ocupado</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--gold)', borderRadius: '50%', marginRight: 4, verticalAlign: 'middle' }} />Reservado</span>
      </div>

      {/* BAR */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: 10 }}>Barra</div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
          {Array.from({ length: TOTAL_BAR }, (_, i) => {
            const id = `bar-${i + 1}`;
            const s = floor[id];
            return (
              <div key={id} onClick={() => toggle(id)} style={{
                width: 42, height: 42, borderRadius: '50%',
                border: `1.5px solid ${COLORS[s.status]}`, background: s.status !== 'available' ? COLORS[s.status] : 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s', fontSize: 9, color: s.status !== 'available' ? 'var(--ink)' : 'var(--mist)',
              }}>
                <div style={{ fontWeight: 500 }}>{i + 1}</div>
                {s.party && <div style={{ fontSize: 7 }}>{s.party}p</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* TABLES */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: 10 }}>Mesas</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {TABLES.map(t => {
            const id = `table-${t}`;
            const s = floor[id];
            return (
              <div key={id} onClick={() => toggle(id)} style={{
                width: 72, height: 72,
                border: `1.5px solid ${COLORS[s.status]}`, background: s.status !== 'available' ? COLORS[s.status] : 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s', fontSize: 10, color: s.status !== 'available' ? 'var(--ink)' : 'var(--mist)',
              }}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 18 }}>{t}</div>
                {s.party && <div style={{ fontSize: 8 }}>{s.party}p · {s.time}</div>}
                {s.name && <div style={{ fontSize: 8, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
