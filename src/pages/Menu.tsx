import { useState, useMemo } from 'react';
import { MENU_ITEMS, CATEGORY_META, type MenuCategory, type MenuItem } from '../data/menu';
import MenuModal from '../components/MenuModal';
import './Menu.css';

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as MenuCategory[];

export default function Menu() {
  const [active, setActive] = useState<MenuCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    let items = active === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.badge.toLowerCase().includes(q)
      );
    }
    return items;
  }, [active, search]);

  const grouped = useMemo(() => {
    if (active !== 'all') return [[active, filtered] as const];
    const map = new Map<MenuCategory, MenuItem[]>();
    for (const item of filtered) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return ALL_CATEGORIES
      .filter(c => map.has(c))
      .map(c => [c, map.get(c)!] as const);
  }, [active, filtered]);

  return (
    <div className="menu-page">
      {/* HEADER */}
      <header className="menu-header">
        <div className="container">
          <p className="section-jp">お品書き</p>
          <h1 className="section-title">Nuestra Carta</h1>
          <div className="gold-divider" />
          <p className="menu-header__sub">65 creaciones · 9 categorías · Ingredientes premium</p>
        </div>
      </header>

      <div className="container menu-layout">
        {/* FILTERS */}
        <aside className="menu-filters">
          <div className="menu-search">
            <input
              type="text"
              placeholder="Buscar platillo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar en el menú"
            />
          </div>

          <nav className="menu-cats" aria-label="Categorías">
            <button
              className={`menu-cat ${active === 'all' ? 'menu-cat--active' : ''}`}
              onClick={() => setActive('all')}
            >
              Todos
              <span className="menu-cat__count">{MENU_ITEMS.length}</span>
            </button>
            {ALL_CATEGORIES.map(cat => {
              const meta = CATEGORY_META[cat];
              const count = MENU_ITEMS.filter(i => i.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`menu-cat ${active === cat ? 'menu-cat--active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  <span className="menu-cat__jp">{meta.jp}</span>
                  {meta.label}
                  <span className="menu-cat__count">{count}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ITEMS */}
        <main className="menu-items">
          {grouped.map(([cat, items]) => {
            const meta = CATEGORY_META[cat];
            return (
              <section key={cat} className="menu-section" id={cat}>
                <div className="menu-section__head">
                  <span className="section-jp">{meta.jp}</span>
                  <h2 className="menu-section__title">{meta.label}</h2>
                  {meta.desc && <p className="menu-section__desc">{meta.desc}</p>}
                </div>

                <div className="menu-grid">
                  {items.map(item => {
                    const badgeClass = item.isSignature ? 'badge badge--signature'
                      : item.isGlutenFree ? 'badge badge--gf'
                      : item.isChefPick ? 'badge badge--chef'
                      : 'badge';

                    return (
                      <article
                        key={item.id}
                        className="menu-card"
                        onClick={() => setSelected(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') setSelected(item); }}
                      >
                        <div className="menu-card__img">
                          <img src={`/images/${item.image}`} alt={item.name} loading="lazy" />
                        </div>
                        <div className="menu-card__body">
                          <span className={badgeClass}>{item.badge}</span>
                          <h3 className="menu-card__name">{item.name}</h3>
                          <p className="menu-card__desc">{item.description}</p>
                          <p className="menu-card__price">{item.price}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <div className="menu-empty">
              <p>No se encontraron platillos.</p>
            </div>
          )}
        </main>
      </div>

      <MenuModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
