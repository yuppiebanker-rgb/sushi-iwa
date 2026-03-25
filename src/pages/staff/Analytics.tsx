import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './staff.css';

const DAYS = ['Lun', 'Mar', 'Mi\u00e9', 'Jue', 'Vie', 'S\u00e1b', 'Dom'];
const HOURS = ['13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

const HEATMAP = [
  [2, 3, 2, 1, 1, 2, 4, 6, 7, 5, 2],
  [1, 1, 1, 1, 1, 2, 3, 5, 5, 3, 1],
  [2, 3, 2, 2, 2, 4, 6, 8, 8, 6, 3],
  [3, 4, 3, 2, 3, 5, 7, 9, 9, 7, 4],
  [4, 5, 4, 3, 4, 7, 9, 10, 10, 8, 5],
  [5, 6, 5, 4, 5, 8, 10, 10, 10, 9, 6],
  [4, 5, 4, 3, 3, 6, 8, 9, 8, 6, 3],
];

const TOP_DISHES = [
  { name: 'Curricanes Salm\u00f3n', count: 87 },
  { name: 'No Name Roll', count: 72 },
  { name: 'Hamachi Jalape\u00f1o', count: 65 },
  { name: 'IWA Roll', count: 58 },
  { name: 'Rainbow Roll', count: 51 },
];

const WEEKLY_RES = DAYS.map((d, i) => ({ day: d, res: [4, 2, 6, 8, 14, 16, 10][i] }));

const FUNNEL_DATA = [
  { label: 'Visitas al sitio', value: 2840, pct: 100 },
  { label: 'Vieron men\u00fa', value: 1420, pct: 50 },
  { label: 'Iniciaron reserva', value: 312, pct: 11 },
  { label: 'Reserva completada', value: 186, pct: 6.5 },
];

const WA_QUEUE = { pending: 4, sentToday: 38, sendRate: 94 };

const LOCATIONS = [
  { city: 'Monterrey', covers: 312, reservations: 60, eightySixed: 2, waitlist: 8 },
  { city: 'Saltillo', covers: 184, reservations: 34, eightySixed: 1, waitlist: 3 },
  { city: 'Hermosillo', covers: 226, reservations: 42, eightySixed: 0, waitlist: 5 },
  { city: 'Obreg\u00f3n', covers: 148, reservations: 28, eightySixed: 3, waitlist: 2 },
];

function heatColor(v: number) {
  const t = v / 10;
  return `rgb(${Math.round(184 * t)},${Math.round(146 * t * 0.6)},${Math.round(42 * t)})`;
}

const tipStyle = { background: '#0e0d0b', border: '0.5px solid rgba(184,146,42,0.18)', fontSize: 11 };

const label = (text: string) => (
  <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 14 }}>{text}</div>
);

export default function Analytics() {
  const [tab, setTab] = useState<'dashboard' | 'conversiones' | 'sucursales'>('dashboard');

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Anal\u00edticas</div>
          <h1 className="sp-title">Esta semana</h1>
        </div>
      </div>

      <div className="sp-tabs">
        {(['dashboard', 'conversiones', 'sucursales'] as const).map(t => (
          <button key={t} className={`sp-tab ${tab === t ? 'sp-tab--active' : ''}`} onClick={() => setTab(t)}>
            {t === 'dashboard' ? 'Dashboard' : t === 'conversiones' ? 'Conversiones' : 'Sucursales'}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <>
          <div className="sp-metrics">
            <div className="sp-metric"><div className="sp-metric-val">312</div><div className="sp-metric-label">Cubiertos</div></div>
            <div className="sp-metric"><div className="sp-metric-val">60</div><div className="sp-metric-label">Reservaciones</div></div>
            <div className="sp-metric"><div className="sp-metric-val">Curricanes</div><div className="sp-metric-label">M\u00e1s pedido</div></div>
            <div className="sp-metric"><div className="sp-metric-val">20:00</div><div className="sp-metric-label">Hora pico</div></div>
          </div>

          {/* WhatsApp Queue */}
          <div className="sp-card" style={{ marginBottom: 24, padding: 20 }}>
            {label('Cola de WhatsApp')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
              <div style={{ background: 'var(--ink)', padding: '14px 12px' }}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: WA_QUEUE.pending > 0 ? '#c4a229' : 'var(--gold)' }}>{WA_QUEUE.pending}</div>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', marginTop: 4 }}>Pendientes</div>
              </div>
              <div style={{ background: 'var(--ink)', padding: '14px 12px' }}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: 'var(--gold)' }}>{WA_QUEUE.sentToday}</div>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', marginTop: 4 }}>Enviados hoy</div>
              </div>
              <div style={{ background: 'var(--ink)', padding: '14px 12px' }}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: WA_QUEUE.sendRate >= 90 ? '#3a9' : '#c66' }}>{WA_QUEUE.sendRate}%</div>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', marginTop: 4 }}>Tasa de env\u00edo</div>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="sp-card" style={{ marginBottom: 24, padding: 20 }}>
            {label('Mapa de calor semanal')}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 500 }}>
                <thead>
                  <tr>
                    <th style={{ width: 40 }} />
                    {HOURS.map(h => <th key={h} style={{ fontSize: 8, color: 'var(--mist)', padding: '4px 2px', fontWeight: 300 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((day, di) => (
                    <tr key={day}>
                      <td style={{ fontSize: 9, color: 'var(--mist)', paddingRight: 6, textAlign: 'right' }}>{day}</td>
                      {HEATMAP[di].map((v, hi) => (
                        <td key={hi} style={{ padding: 2 }}>
                          <div style={{ width: '100%', height: 24, background: heatColor(v), borderRadius: 2, minWidth: 28 }} title={`${v}/10`} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Dishes */}
          <div className="sp-card" style={{ marginBottom: 24, padding: 20 }}>
            {label('Top 5 platillos')}
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={TOP_DISHES} layout="vertical" margin={{ left: 100 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#f4efe6' }} width={100} />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="count" radius={[0, 2, 2, 0]}>
                  {TOP_DISHES.map((_, i) => <Cell key={i} fill={i === 0 ? '#b8922a' : 'rgba(184,146,42,0.35)'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Reservations */}
          <div className="sp-card" style={{ padding: 20 }}>
            {label('Reservaciones por d\u00eda')}
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={WEEKLY_RES}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#7a7670' }} />
                <YAxis tick={{ fontSize: 10, fill: '#7a7670' }} />
                <Tooltip contentStyle={tipStyle} />
                <Line type="monotone" dataKey="res" stroke="#b8922a" strokeWidth={1.5} dot={{ fill: '#b8922a', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {tab === 'conversiones' && (
        <>
          <div className="sp-card" style={{ padding: 20 }}>
            {label('Embudo de conversi\u00f3n')}
            <p style={{ fontSize: 11, color: 'var(--mist)', marginBottom: 20, lineHeight: 1.5 }}>
              De cada 100 visitantes, {FUNNEL_DATA[3].pct}% completa una reservaci\u00f3n.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FUNNEL_DATA.map((step, i) => {
                const dropOff = i > 0
                  ? Math.round(((FUNNEL_DATA[i - 1].value - step.value) / FUNNEL_DATA[i - 1].value) * 100)
                  : 0;
                return (
                  <div key={step.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: '#f4efe6' }}>{step.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--gold)', fontFamily: 'var(--font-d)' }}>
                        {step.value.toLocaleString()}
                        {i > 0 && <span style={{ fontSize: 10, color: '#c66', marginLeft: 8 }}>-{dropOff}%</span>}
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(244,239,230,0.04)', borderRadius: 1 }}>
                      <div style={{
                        width: `${Math.max(step.pct, 4)}%`, height: '100%',
                        background: i === FUNNEL_DATA.length - 1 ? '#3a9' : '#b8922a',
                        borderRadius: 1, transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sp-metrics" style={{ marginTop: 24 }}>
            <div className="sp-metric">
              <div className="sp-metric-val">{FUNNEL_DATA[3].pct}%</div>
              <div className="sp-metric-label">Tasa global</div>
            </div>
            <div className="sp-metric">
              <div className="sp-metric-val">{Math.round((FUNNEL_DATA[1].value / FUNNEL_DATA[0].value) * 100)}%</div>
              <div className="sp-metric-label">Visita \u2192 Men\u00fa</div>
            </div>
            <div className="sp-metric">
              <div className="sp-metric-val">{Math.round((FUNNEL_DATA[2].value / FUNNEL_DATA[1].value) * 100)}%</div>
              <div className="sp-metric-label">Men\u00fa \u2192 Reserva</div>
            </div>
            <div className="sp-metric">
              <div className="sp-metric-val">{Math.round((FUNNEL_DATA[3].value / FUNNEL_DATA[2].value) * 100)}%</div>
              <div className="sp-metric-label">Inicio \u2192 Completa</div>
            </div>
          </div>
        </>
      )}

      {tab === 'sucursales' && (
        <>
          {label('Comparaci\u00f3n por sucursal \u2014 Esta semana')}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {LOCATIONS.map(loc => (
              <div className="sp-card" key={loc.city} style={{ padding: 20 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{loc.city}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: 'var(--cream)' }}>{loc.covers}</div>
                    <div style={{ fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mist)' }}>Cubiertos</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: 'var(--cream)' }}>{loc.reservations}</div>
                    <div style={{ fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mist)' }}>Reservaciones</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: loc.eightySixed > 0 ? '#c66' : '#3a9' }}>{loc.eightySixed}</div>
                    <div style={{ fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mist)' }}>86'd items</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, fontWeight: 300, color: loc.waitlist > 5 ? '#c4a229' : 'var(--cream)' }}>{loc.waitlist}</div>
                    <div style={{ fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mist)' }}>En espera</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
