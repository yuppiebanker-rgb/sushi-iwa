import { useState, useEffect } from 'react';
import './staff.css';

type Status = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
interface Res { id: string; name: string; people: string; time: string; location: string; phone: string; notes: string; status: Status; }

function getKey(date: string) { return `iwa-res-${date}`; }
function today() { return new Date().toISOString().slice(0, 10); }

const STATUS_BADGE: Record<Status, string> = { pendiente: 'yellow', confirmada: 'green', cancelada: 'red', completada: 'gray' };

export default function Reservations() {
  const [date, setDate] = useState(today);
  const [list, setList] = useState<Res[]>([]);
  const [filter, setFilter] = useState<'all' | 'pendiente' | 'confirmada'>('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', people: '2', time: '19:00', location: 'Monterrey', phone: '', notes: '' });

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem(getKey(date)) || '[]')); } catch { setList([]); }
  }, [date]);

  const save = (next: Res[]) => { setList(next); localStorage.setItem(getKey(date), JSON.stringify(next)); };

  const addRes = () => {
    if (!form.name.trim()) return;
    const r: Res = { ...form, id: Date.now().toString(), status: 'pendiente' };
    save([...list, r]);
    setForm({ name: '', people: '2', time: '19:00', location: 'Monterrey', phone: '', notes: '' });
    setShowForm(false);
  };

  const setStatus = (id: string, status: Status) => save(list.map(r => r.id === id ? { ...r, status } : r));

  const confirm = (r: Res) => {
    setStatus(r.id, 'confirmada');
    const msg = `Hola ${r.name}, confirmamos su reservación para ${r.people} personas hoy a las ${r.time} en Sushi IWA. いわ`;
    window.open(`https://wa.me/${r.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const cancel = (r: Res) => {
    setStatus(r.id, 'cancelada');
    const msg = `Hola ${r.name}, lamentamos informarle que su reservación ha sido cancelada. Esperamos verlo pronto. Sushi IWA いわ`;
    if (r.phone) window.open(`https://wa.me/${r.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filtered = filter === 'all' ? list : list.filter(r => r.status === filter);

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Reservaciones</div>
          <h1 className="sp-title">Reservaciones</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="date" className="sp-input" style={{ width: 'auto' }} value={date} onChange={e => setDate(e.target.value)} />
          <button className="sp-btn sp-btn--gold" onClick={() => setShowForm(!showForm)}>+ Nueva</button>
        </div>
      </div>

      <div className="sp-tabs">
        {(['all', 'pendiente', 'confirmada'] as const).map(f => (
          <button key={f} className={`sp-tab ${filter === f ? 'sp-tab--active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="sp-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            <input className="sp-input" placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input className="sp-input" placeholder="Teléfono" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr', gap: 8, marginBottom: 8 }}>
            <select className="sp-select" value={form.people} onChange={e => setForm({...form, people: e.target.value})}>
              {[1,2,3,4,5,'6+'].map(n => <option key={n} value={n}>{n}p</option>)}
            </select>
            <input className="sp-input" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
            <input className="sp-input" placeholder="Notas" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <button className="sp-btn sp-btn--gold" onClick={addRes}>Crear Reservación</button>
        </div>
      )}

      {filtered.sort((a, b) => a.time.localeCompare(b.time)).map(r => (
        <div className="sp-card" key={r.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: 17, color: 'var(--cream)' }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--mist)' }}>{r.time} · {r.people} personas · {r.location}</div>
              {r.phone && <div style={{ fontSize: 10, color: 'var(--mist)' }}>{r.phone}</div>}
              {r.notes && <div style={{ fontSize: 10, color: 'var(--mist)', fontStyle: 'italic' }}>{r.notes}</div>}
            </div>
            <span className={`sp-badge sp-badge--${STATUS_BADGE[r.status]}`}>{r.status}</span>
          </div>
          <div className="sp-actions">
            {r.status === 'pendiente' && <button className="sp-btn sp-btn--gold sp-btn--sm" onClick={() => confirm(r)}>Confirmar</button>}
            {(r.status === 'pendiente' || r.status === 'confirmada') && <button className="sp-btn sp-btn--sm" onClick={() => setStatus(r.id, 'completada')}>Completada</button>}
            {r.status !== 'cancelada' && r.status !== 'completada' && <button className="sp-btn sp-btn--red sp-btn--sm" onClick={() => cancel(r)}>Cancelar</button>}
          </div>
        </div>
      ))}

      {filtered.length === 0 && <p style={{ fontSize: 13, color: 'var(--mist)', textAlign: 'center', padding: 40 }}>No hay reservaciones {filter !== 'all' ? filter + 's' : ''} para esta fecha.</p>}
    </div>
  );
}
