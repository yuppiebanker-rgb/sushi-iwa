import { useState, useRef, useCallback } from 'react';
import { MENU_ITEMS, CATEGORIES, CATEGORY_ORDER, DRINKS, type MenuItem, type MenuCategory, type DrinkSection, type DrinkGroup } from '../data/menu';
import MenuModal from '../components/MenuModal';
import './Menu.css';

const ALL_TABS = [...CATEGORY_ORDER.map(c => ({ id: c, label: CATEGORIES[c].label.split(' · ')[0].replace(' · Sin Arroz', '') })),
  { id: 'sake', label: 'Sake & Vinos' },
  { id: 'bebidas', label: 'Bebidas' },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<string>('entradas');
  const [modal, setModal] = useState<{ name: string; badge: string; desc: string; price: string; image: string } | null>(null);
  const mbRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openModal = (item: MenuItem) => {
    setModal({ name: item.name, badge: item.badge, desc: item.desc, price: item.price, image: item.image });
  };

  const byCategory = (cat: MenuCategory) => MENU_ITEMS.filter(i => i.category === cat);

  return (
    <div className="menu-page">
      {/* HERO */}
      <div className="mhero">
        <div className="mhero-bg" style={{ backgroundImage: `url(/images/bar.jpg)` }} />
        <div className="mhero-ov" />
        <div className="mhero-c">
          <div className="mhero-tag">Menú completo · 2025</div>
          <h1 className="mhero-h">La <em>carta</em> de IWA</h1>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <div className="ctnav" id="ctnav">
        {ALL_TABS.map(t => (
          <button key={t.id} className={`cb ${activeTab === t.id ? 'on' : ''}`} onClick={() => scrollTo(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* MAIN BODY */}
      <div className="mb" ref={mbRef}>
        {CATEGORY_ORDER.map((cat, idx) => {
          const meta = CATEGORIES[cat];
          const items = byCategory(cat);

          return (
            <div key={cat}>
              {idx > 0 && (
                <div className="mdiv"><div className="mdl" /><div className="mdm">{meta.divider}</div><div className="mdl" /></div>
              )}
              <div className="ms" id={cat}>
                <div className="sh">
                  <div className="sn">{meta.num}</div>
                  <div>
                    <div className="sjp">{meta.jp}</div>
                    <div className="st">{meta.label}</div>
                    {meta.desc && <div className="sd">{meta.desc}</div>}
                  </div>
                </div>

                {meta.layout === 'nigiri' ? (
                  /* NIGIRI ROW LAYOUT */
                  <div className="ng">
                    {items.map(item => (
                      <div className="ni" key={item.id} onClick={() => openModal(item)}>
                        <img className="nth" src={`/images/${item.image}`} alt={item.name} />
                        <div className="nb">
                          <div className="nn">{item.name}</div>
                          <div className="ns">{item.desc}</div>
                          <div className="np">{item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* STANDARD 3-COL GRID */
                  <div className={`ig ${meta.cols === 2 ? 'ig2' : ''}`}>
                    {items.map(item => (
                      <div className="item" key={item.id} onClick={() => openModal(item)}>
                        <div className="item-img-wrap">
                          <img className="item-img" src={`/images/${item.image}`} alt={item.name} />
                        </div>
                        <div className="ib">
                          <div className="ibadge">{item.badge}</div>
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
            <div className="ms" id={section.id}>
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
      </div>

      <p className="notice">
        "El consumo de mariscos crudos o poco cocidos puede aumentar el riesgo de enfermedades transmisibles por los alimentos o causar alergias severas en algunas personas."
      </p>

      <MenuModal item={modal} onClose={() => setModal(null)} />
    </div>
  );
}
