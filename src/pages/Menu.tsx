import { useState, useMemo, useRef, useCallback, type KeyboardEvent } from 'react';
import { MENU_ITEMS, CATEGORIES, CATEGORY_ORDER, DRINKS, type MenuItem, type MenuCategory, type DrinkSection, type DrinkGroup } from '../data/menu';
import { IMAGE_ALTS } from '../data/imageAlts';
import MenuModal from '../components/MenuModal';
import SeasonalBadge from '../components/SeasonalBadge';
import SEO from '../components/SEO';
import { useRevealAll } from '../hooks/useScrollReveal';
import './Menu.css';
import '../styles/menu-effects.css';

type Filter = 'all' | 'firma' | 'gf' | 'spicy' | 'chef';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'firma', label: 'Firma' },
  { id: 'gf', label: 'Gluten Free' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'chef', label: "Chef's Pick" },
];

const ALL_TABS = [...CATEGORY_ORDER.map(c => ({ id: c, label: CATEGORIES[c].label.split(' · ')[0].replace(' · Sin Arroz', '') })),
  { id: 'sake', label: 'Sake & Vinos' },
  { id: 'bebidas', label: 'Bebidas' },
];

function matchesFilter(item: MenuItem, filter: Filter): boolean {
  if (filter === 'all') return true;
  if (filter === 'firma') return !!item.isSignature;
  if (filter === 'gf') return !!item.isGlutenFree;
  if (filter === 'spicy') return item.name.toLowerCase().includes('spicy') || item.desc.toLowerCase().includes('spicy');
  if (filter === 'chef') return !!item.isChefPick;
  return true;
}

function get86(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem('iwa-86') || '{}'); } catch { return {}; }
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<string>('entradas');
  const [modal, setModal] = useState<{ name: string; badge: string; desc: string; price: string; image: string } | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const mbRef = useRef<HTMLDivElement>(null);
  const eighted = get86();
  const [resOpen, setResOpen] = useState(false);
  const [resNote, setResNote] = useState('');

  useRevealAll();

  const filtered = useMemo(() => {
    let items = MENU_ITEMS;
    if (filter !== 'all') items = items.filter(i => matchesFilter(i, filter));
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q) || i.badge.toLowerCase().includes(q));
    }
    return items;
  }, [search, filter]);

  const isFiltering = search.trim() !== '' || filter !== 'all';

  const scrollTo = useCallback((id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openModal = (item: MenuItem) => {
    setModal({ name: item.name, badge: item.badge, desc: item.desc, price: item.price, image: item.image });
  };

  const byCategory = (cat: MenuCategory) => filtered.filter(i => i.category === cat);

  return (
    <div className="menu-page">
      <SEO
        title="Menú — Sushi IWA | Rollos, Sashimi, Curricanes, Nigiris"
        description="Menú completo de Sushi IWA: curricanes, sashimi, rollos gluten-free, nigiris y temaki. Ingredientes premium. Monterrey, San Pedro Garza García."
        keywords="menu sushi monterrey, rollos sushi san pedro, sashimi monterrey, curricanes sushi, menu japones spgg"
        path="/menu"
      />
      {/* HERO */}
      <div className="mhero">
        <div className="mhero-bg" style={{ backgroundImage: `url(/images/bar.jpg)` }} />
        <div className="mhero-ov" />
        <div className="mhero-c">
          <div className="mhero-tag">Menú completo · 2025</div>
          <h1 className="mhero-h">La <em>carta</em> de IWA</h1>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="search-bar">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" width="14" height="14"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar platillo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className="filter-pills">
          {FILTERS.map(f => (
            <button key={f.id} className={`fpill ${filter === f.id ? 'fpill-on' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY NAV */}
      {!isFiltering && (
        <div className="ctnav" id="ctnav">
          {ALL_TABS.map(t => (
            <button key={t.id} className={`cb ${activeTab === t.id ? 'on' : ''}`} onClick={() => scrollTo(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* MAIN BODY */}
      <div className="mb" ref={mbRef}>
        {/* FILTERED VIEW — flat grid */}
        {isFiltering ? (
          filtered.length > 0 ? (
            <div className="ms">
              <div className="ig filtered-grid">
                {filtered.map(item => (
                  <div className="item item-fade menu-card" key={item.id} onClick={() => openModal(item)}>
                    <div className="item-img-wrap">
                      <img className="item-img" src={`/images/${item.image}`} alt={item.name} loading="lazy" />
                    </div>
                    <div className="ib">
                      <div className="ibadge">{item.badge}{item.isSeasonal && <> <SeasonalBadge /></>}{eighted[item.id] && <span className="i86">Agotado</span>}</div>
                      <div className={`iname ${eighted[item.id] ? 'i86-name' : ''}`}>{item.name}</div>
                      <div className="idesc">{item.desc}</div>
                      <div className="ifooter">
                        <span className="iprice">{item.price}</span>
                        <div className="iarrow">→</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="menu-empty">No encontramos ese platillo 🥢</div>
          )
        ) : (
          <>
            {CATEGORY_ORDER.map((cat, idx) => {
              const meta = CATEGORIES[cat];
              const items = byCategory(cat);
              if (items.length === 0) return null;

              return (
                <div key={cat}>
                  {idx > 0 && (
                    <div className="mdiv"><div className="mdl" /><div className="mdm">{meta.divider}</div><div className="mdl" /></div>
                  )}
                  <div data-reveal className="ms" id={cat}>
                    <div className="sh">
                      <div className="sn">{meta.num}</div>
                      <div>
                        <div className="sjp">{meta.jp}</div>
                        <div className="st">{meta.label}</div>
                        {meta.desc && <div className="sd">{meta.desc}</div>}
                      </div>
                    </div>

                    {meta.layout === 'nigiri' ? (
                      <div className="ng">
                        {items.map(item => (
                          <div className="ni item-fade nigiri-row" key={item.id} onClick={() => openModal(item)}>
                            <img className="nth" src={`/images/${item.image}`} alt={item.name} loading="lazy" />
                            <div className="nb">
                              <div className="nn">{item.name}</div>
                              <div className="ns">{item.desc}</div>
                              <div className="np">{item.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`ig ${meta.cols === 2 ? 'ig2' : ''}`}>
                        {items.map(item => (
                          <div className="item item-fade menu-card" key={item.id} onClick={() => openModal(item)}>
                            <div className="item-img-wrap">
                              <img className="item-img" src={`/images/${item.image}`} alt={item.name} loading="lazy" />
                            </div>
                            <div className="ib">
                              <div className="ibadge">{item.badge}{item.isSeasonal && <> <SeasonalBadge /></>}</div>
                              <div className="iname">{item.name}</div>
                              <div className="idesc">{item.desc}</div>
                              <div className="ifooter">
                                <span className="iprice">{item.price}</span>
                                <div className="iarrow">→</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* DRINKS SECTIONS */}
            {DRINKS.map((section: DrinkSection) => (
              <div key={section.id}>
                <div className="mdiv"><div className="mdl" /><div className="mdm">{section.divider}</div><div className="mdl" /></div>
                <div data-reveal className="ms" id={section.id}>
                  <div className="sh">
                    <div className="sn">{section.num}</div>
                    <div>
                      <div className="sjp">{section.jp}</div>
                      <div className="st">{section.title}</div>
                    </div>
                  </div>
                  <div className="lc">
                    {section.cols.map((col: DrinkGroup[], ci: number) => (
                      <div key={ci}>
                        {col.map((group: DrinkGroup) => (
                          <div className="lg" key={group.label}>
                            <div className="lgt">{group.label}</div>
                            {group.items.map((d, di) => (
                              <div className="lr" key={di}>
                                <div>
                                  <div className="ln">{d.name}</div>
                                  {d.sub && <div className="lsub">{d.sub}</div>}
                                </div>
                                <div className="lp">{d.price}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <p className="notice">
        "El consumo de mariscos crudos o poco cocidos puede aumentar el riesgo de enfermedades transmisibles por los alimentos o causar alergias severas en algunas personas."
      </p>

      <MenuModal item={modal} onClose={() => setModal(null)} onOpenReservation={(note) => { setModal(null); setResNote(note); setResOpen(true); }} />
      <ReservationFlow open={resOpen} onClose={() => setResOpen(false)} preNote={resNote} />
    </div>
  );
}
