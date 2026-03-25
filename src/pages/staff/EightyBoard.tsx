import { useState, useEffect } from 'react';
import { MENU_ITEMS, CATEGORIES, CATEGORY_ORDER, type MenuCategory } from '../../data/menu';
import { useLocation_ } from '../../lib/location-context';
import LocationSelector from '../../components/staff/LocationSelector';
import './staff.css';

export default function EightyBoard() {
  const { locationId, location } = useLocation_();
  const storageKey = `iwa-86-${locationId}`;
  const [eighted, setEighted] = useState<Record<string, string>>({});

  useEffect(() => {
    try { setEighted(JSON.parse(localStorage.getItem(storageKey) || '{}')); } catch { /* */ }
  }, [storageKey]);

  const save = (next: Record<string, string>) => { setEighted(next); localStorage.setItem(storageKey, JSON.stringify(next)); };

  const toggle = (id: string) => {
    if (eighted[id]) {
      const next = { ...eighted };
      delete next[id];
      save(next);
    } else {
      const reason = prompt('Raz\u00f3n (opcional):') || '';
      save({ ...eighted, [id]: reason || 'agotado' });
    }
  };

  const resetAll = () => {
    if (confirm('\u00bfResetear todo el 86 board? Todos los platillos volver\u00e1n a estar disponibles.')) {
      save({});
    }
  };

  const count = Object.keys(eighted).length;

  return (
    <div>
      <LocationSelector />

      <div className="sp-header">
        <div>
          <div className="sp-subtitle">86 Board \u00b7 {location.name}</div>
          <h1 className="sp-title">{count} platillos no disponibles</h1>
        </div>
        {count > 0 && <button className="sp-btn sp-btn--red" onClick={resetAll}>Resetear todo</button>}
      </div>

      {CATEGORY_ORDER.map((cat: MenuCategory) => {
        const items = MENU_ITEMS.filter(i => i.category === cat);
        const meta = CATEGORIES[cat];
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-jp)', fontSize: 10 }}>{meta.jp}</span> {meta.label}
            </div>
            {items.map(item => {
              const is86 = !!eighted[item.id];
              return (
                <div key={item.id} className="sp-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', opacity: is86 ? 0.6 : 1 }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-d)', fontSize: 15, color: 'var(--cream)', textDecoration: is86 ? 'line-through' : 'none' }}>{item.name}</span>
                    {is86 && <span className="sp-badge sp-badge--red" style={{ marginLeft: 10 }}>Agotado</span>}
                    {is86 && eighted[item.id] !== 'agotado' && (
                      <div style={{ fontSize: 10, color: 'var(--mist)', fontStyle: 'italic', marginTop: 2 }}>{eighted[item.id]}</div>
                    )}
                  </div>
                  <button className={`sp-btn sp-btn--sm ${is86 ? 'sp-btn--gold' : 'sp-btn--red'}`} onClick={() => toggle(item.id)}>
                    {is86 ? 'Disponible' : '86'}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
