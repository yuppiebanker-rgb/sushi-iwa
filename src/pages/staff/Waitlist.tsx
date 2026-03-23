import { useState, useEffect } from 'react';
import './staff.css';

interface WLEntry { id: string; name: string; size: number; phone: string; notes: string; addedAt: number; }

function getKey(loc: string) {
  return `iwa-wl-${loc}-${new Date().toISOString().slice(0, 10)}`;
}

export default function Waitlist() {
  const loc = localStorage.getItem('iwa-staff-loc') || 'Monterrey';
  const [list, setList] = useState<WLEntry[]>([]);
  const [seated, setSeated] = useState(0);
  const [form, setForm] = useState({ name: '', size: '2', phone: '', notes: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem(getKey(loc)) || '[]')); } catch { /* */ }
  }, [loc]);

  const save = (next: WLEntry[]) => { setList(next); localStorage.setItem(getKey(loc), JSON.stringify(next)); };

  const addEntry = () => {
    if (!form.name.trim()) return;
    const entry: WLEntry = { id: Date.now().toString(), name: form.name, size: +form.size, phone: form.phone, notes: form.notes, addedAt: Date.now() };
    save([...list, entry]);
    setForm({ name: '', size: '2', phone: '', notes: '' });
    setShowForm(false);
  };

  const seat = (id: string) => { save(list.filter(e => e.id !== id)); setSeated(s => s + 1); };
  const remove = (id: string) => { save(list.filter(e => e.id !== id)); };

  const notify = (entry: WLEntry) => {
    const msg = `Hola ${entry.name}, su mesa está lista en Sushi IWA. Los esperamos en los próximos 5 minutos. いわ`;
    window.open(`https://wa.me/${entry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const avgWait = list.length > 0 ? Math.round(list.reduce((a, e) => a + (Date.now() - e.addedAt), 0) / list.length / 60000) : 0;

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Waitlist · {loc}</div>
          <h1 className="sp-title">Lista de Espera</h1>
        </div>
        <button className="sp-btn sp-btn--gold" onClick={() => setShowForm(!showForm)}>+ Agregar</button>
      </div>

      <div className="sp-metrics">
        <div className="sp-metric"><div className="sp-metric-val">{list.length}</div><div className="sp-metric-label">En cola</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{avgWait}m</div><div className="sp-metric-label">Espera promedio</div></div>
        <div className="sp-metric"><div className="sp-metric-val">{seated}</div><div className="sp-metric-label">Sentados hoy</div></div>
      </div>

      {showForm && (
        <div className="sp-card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8, marginBottom: 8 }}>
            <input className="sp-input" placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <select className="sp-select" value={form.size} onChange={e => setForm({...form, size: e.target.value})}>
              {[1,2,3,4,5,6,7,'8+'].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            <input className="sp-input" placeholder="WhatsApp" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <input className="sp-input" placeholder="Notas" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <button className="sp-btn sp-btn--gold" onClick={addEntry}>Agregar a la lista</button>
        </div>
      )}

      {list.map((entry, i) => {
        const mins = Math.round((Date.now() - entry.addedAt) / 60000);
        return (
          <div className="sp-card" key={entry.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: 4 }}>#{i + 1}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 18, color: 'var(--cream)' }}>{entry.name}</div>
                <div style={{ fontSize: 11, color: 'var(--mist)' }}>{entry.size} personas · {mins} min esperando</div>
                {entry.notes && <div style={{ fontSize: 10, color: 'var(--mist)', fontStyle: 'italic', marginTop: 2 }}>{entry.notes}</div>}
              </div>
            </div>
            <div className="sp-actions">
              <button className="sp-btn sp-btn--gold sp-btn--sm" onClick={() => seat(entry.id)}>Sentar</button>
              {entry.phone && <button className="sp-btn sp-btn--sm" onClick={() => notify(entry)}>Notificar</button>}
              <button className="sp-btn sp-btn--red sp-btn--sm" onClick={() => remove(entry.id)}>Eliminar</button>
            </div>
          </div>
        );
      })}

      {list.length === 0 && <p style={{ fontSize: 13, color: 'var(--mist)', textAlign: 'center', padding: 40 }}>No hay nadie en la lista de espera.</p>}
    </div>
  );
}
