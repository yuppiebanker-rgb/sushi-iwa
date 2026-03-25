import { useState, useMemo, useRef, useCallback, type KeyboardEvent } from 'react';
import { MENU_ITEMS, CATEGORIES, CATEGORY_ORDER, DRINKS, type MenuItem, type MenuCategory, type DrinkSection, type DrinkGroup } from '../data/menu';
import { IMAGE_ALTS } from '../data/imageAlts';
import MenuModal from '../components/MenuModal';
import SeasonalBadge from '../components/SeasonalBadge';
import ReservationFlow from '../components/ReservationFlow';
import SEO from '../components/SEO';
import StatementSection from '../components/StatementSection';
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

function getAlt(image: string): string {
  const key = image.replace(/\.\w+$/, '');
  return IMAGE_ALTS[key] || image;
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

  const handleCardKey = (e: KeyboardEvent<HTMLDivElement>, item: MenuItem) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); }
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
        <div className="mhero-bg" style={{ backgroundImage: `url(/images/bar.jpg)` }} role="img" aria-label={IMAGE_ALTS['bar']} />
        <div className="mhero-ov" />
        <div className="mhero-c">
          <div className="mhero-tag">Menú completo · 2025</div>
          <h1 className="mhero-h">La <em>carta</em> de IWA</h1>
        </div>
      </div>

      {/* STATEMENT */}
      <StatementSection
        word="Hamachi."
        subtitle="Del Pacífico a San Pedro."
        cta={null}
      />

      {/* SEARCH + FILTERS */}
      <div className="search-bar">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar platillo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Buscar platillo"
          />
          {search && <button className="search-clear" onClick={() => setSearch('')} aria-label="Limpiar búsqueda">✕</button>}
        </div>
        <div className="filter-pills" role="group" aria-label="Filtros de menú">
          {FILTERS.map(f => (
            <button key={f.id} className={`fpill ${filter === f.id ? 'fpill-on' : ''}`} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY NAV */}
      {!isFiltering && (
        <div className="ctnav" id="ctnav" role="tablist" aria-label="Categorías del menú">
          {ALL_TABS.map(tab => (
            <button key={tab.id} className={`cb ${activeTab === tab.id ? 'on' : ''}`} role="tab" aria-selected={activeTab === tab.id} aria-controls={tab.id} onClick={() => scrollTo(tab.id)}>
              {tab.label}
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
                  <div className="item item-fade menu-card" key={item.id} role="button" tabIndex={0} onClick={() => openModal(item)} onKeyDown={(e) => handleCardKey(e, item)} aria-label={`${item.name} — ${item.price}`}>
                    <div className="item-img-wrap">
                      <img className="item-img" src={`/images/${item.image}`} alt={getAlt(item.image)} loading="lazy" />
                    </div>
                    <div className="ib">
                      <div className="ibadge">{item.badge}<SeasonalBadge show={item.isSeasonal} />{eighted[item.id] && <span className="i86">Agotado</span>}</div>
                      <div className={`iname ${eighted[item.id] ? 'i86-name' : ''}`}>{item.name}</div>
                      <div className="idesc">{item.desc}</div>
                      <div className="ifooter">
                        <span className="iprice">{item.price}</span>
                        <div className="iarrow" aria-hidden="true">→</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="menu-empty" role="status">No encontramos ese platillo</div>
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
                    <div className="mdiv" aria-hidden="true"><div className="mdl" /><div className="mdm">{meta.divider}</div><div className="mdl" /></div>
                  )}
                  <div data-reveal className="ms" id={cat} role="tabpanel" aria-labelledby={cat}>
                    <div className="sh">
                      <div className="sn">{meta.num}</div>
                      <div>
                        <div className="sjp" aria-hidden="true">{meta.jp}</div>
                        <div className="st">{meta.label}</div>
                        {meta.desc && <div className="sd">{meta.desc}</div>}
                      </div>
                    </div>

                    {meta.layout === 'nigiri' ? (
                      <div className="ng photo-grid-stagger">
                        {items.map(item => (
                          <div className="ni item-fade nigiri-row" key={item.id} role="button" tabIndex={0} onClick={() => openModal(item)} onKeyDown={(e) => handleCardKey(e, item)} aria-label={`${item.name} — ${item.price}`}>
                            <img className="nth" src={`/images/${item.image}`} alt={getAlt(item.image)} loading="lazy" />
                            <div className="nb">
                              <div className="nn">{item.name}</div>
                              <div className="ns">{item.desc}</div>
                              <div className="np">{item.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`ig photo-grid-stagger ${meta.cols === 2 ? 'ig2' : ''}`}>
                        {items.map(item => (
                          <div className="item item-fade menu-card" key={item.id} role="button" tabIndex={0} onClick={() => openModal(item)} onKeyDown={(e) => handleCardKey(e, item)} aria-label={`${item.name} — ${item.price}`}>
                            <div className="item-img-wrap">
                              <img className="item-img" src={`/images/${item.image}`} alt={getAlt(item.image)} loading="lazy" />
                            </div>
                            <div className="ib">
                              <div className="ibadge">{item.badge}<SeasonalBadge show={item.isSeasonal} /></div>
                              <div className="iname">{item.name}</div>
                              <div className="idesc">{item.desc}</div>
                              <div className="ifooter">
                                <span className="iprice">{item.price}</span>
                                <div className="iarrow" aria-hidden="true">→</div>
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
                <div className="mdiv" aria-hidden="true"><div className="mdl" /><div className="mdm">{section.divider}</div><div className="mdl" /></div>
                <div data-reveal className="ms" id={section.id} role="tabpanel" aria-labelledby={section.id}>
                  <div className="sh">
                    <div className="sn">{section.num}</div>
                    <div>
                      <div className="sjp" aria-hidden="true">{section.jp}</div>
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
