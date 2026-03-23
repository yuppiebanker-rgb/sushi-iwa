import { useState, useEffect } from 'react';
import './staff.css';

interface Post { id: string; author: string; message: string; pinned: boolean; timestamp: number; }

const CATEGORIES = ['Manager', 'Cocina', 'Barra'];
const STORAGE_KEY = 'iwa-board';

const DEFAULTS: Post[] = [
  { id: '1', author: 'Manager', message: 'Esta semana especial: Hamachi de temporada disponible. Recomendarlo a las mesas.', pinned: true, timestamp: Date.now() - 3600000 },
  { id: '2', author: 'Manager', message: 'Recuerden: reservaciones de grupos 6+ requieren prepago. Pedro', pinned: false, timestamp: Date.now() - 7200000 },
  { id: '3', author: 'Barra', message: 'Sapporo ya llegó — estábamos cortos. Barra.', pinned: false, timestamp: Date.now() - 10800000 },
];

export default function StaffBoard() {
  const [posts, setPosts] = useState<Post[]>(DEFAULTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: CATEGORIES[0], message: '', pinned: false });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored && stored.length > 0) setPosts(stored);
    } catch { /* */ }
  }, []);

  const save = (next: Post[]) => { setPosts(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); };

  const addPost = () => {
    if (!form.message.trim()) return;
    const post: Post = { id: Date.now().toString(), author: form.author, message: form.message, pinned: form.pinned, timestamp: Date.now() };
    save([post, ...posts]);
    setForm({ author: CATEGORIES[0], message: '', pinned: false });
    setShowForm(false);
  };

  const pinned = posts.filter(p => p.pinned);
  const regular = posts.filter(p => !p.pinned).sort((a, b) => b.timestamp - a.timestamp);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) + ' · ' + d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  };

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Staff Board</div>
          <h1 className="sp-title">Anuncios</h1>
        </div>
        <button className="sp-btn sp-btn--gold" onClick={() => setShowForm(!showForm)}>+ Publicar</button>
      </div>

      {showForm && (
        <div className="sp-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <select className="sp-select" value={form.author} onChange={e => setForm({...form, author: e.target.value})}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--mist)', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.pinned} onChange={e => setForm({...form, pinned: e.target.checked})} /> Fijar
            </label>
          </div>
          <textarea className="sp-textarea" placeholder="Escribe tu mensaje..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          <button className="sp-btn sp-btn--gold" style={{ marginTop: 8 }} onClick={addPost}>Publicar</button>
        </div>
      )}

      {pinned.map(post => (
        <div className="sp-card" key={post.id} style={{ borderColor: 'var(--gold)' }}>
          <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>📌 Fijado · {post.author}</div>
          <div style={{ fontSize: 13, color: 'var(--cream)', lineHeight: 1.6 }}>{post.message}</div>
          <div style={{ fontSize: 9, color: 'var(--mist)', marginTop: 6 }}>{formatTime(post.timestamp)}</div>
        </div>
      ))}

      {regular.map(post => (
        <div className="sp-card" key={post.id}>
          <div style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 4 }}>{post.author}</div>
          <div style={{ fontSize: 13, color: 'var(--cream)', lineHeight: 1.6 }}>{post.message}</div>
          <div style={{ fontSize: 9, color: 'var(--mist)', marginTop: 6 }}>{formatTime(post.timestamp)}</div>
        </div>
      ))}
    </div>
  );
}
