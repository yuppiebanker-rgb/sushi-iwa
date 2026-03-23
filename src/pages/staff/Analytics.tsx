import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './staff.css';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
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
  { name: 'Curricanes Salmón', count: 87 },
  { name: 'No Name Roll', count: 72 },
  { name: 'Hamachi Jalapeño', count: 65 },
  { name: 'IWA Roll', count: 58 },
  { name: 'Rainbow Roll', count: 51 },
];

const WEEKLY_RES = DAYS.map((d, i) => ({ day: d, res: [4, 2, 6, 8, 14, 16, 10][i] }));

function heatColor(v: number) {
  const t = v / 10;
  const r = Math.round(184 * t);
  const g = Math.round(146 * t * 0.6);
  const b = Math.round(42 * t);
  return `rgb(${r},${g},${b})`;
}

export default function Analytics() {
  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Analíticas</div>
          <h1 className="sp-title">Esta semana</h1>
        </div>
      </div>

      <div className="sp-metrics">
        <div className="sp-metric"><div className="sp-metric-val">312</div><div className="sp-metric-label">Cubiertos</div></div>
        <div className="sp-metric"><div className="sp-metric-val">60</div><div className="sp-metric-label">Reservaciones</div></div>
        <div className="sp-metric"><div className="sp-metric-val">Curricanes</div><div className="sp-metric-label">Más pedido</div></div>
        <div className="sp-metric"><div className="sp-metric-val">20:00</div><div className="sp-metric-label">Hora pico</div></div>
      </div>

      {/* HEATMAP */}
      <div className="sp-card" style={{ marginBottom: 24, padding: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>Mapa de calor semanal</div>
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

      {/* TOP DISHES */}
      <div className="sp-card" style={{ marginBottom: 24, padding: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>Top 5 platillos</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={TOP_DISHES} layout="vertical" margin={{ left: 100 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#f4efe6' }} width={100} />
            <Tooltip contentStyle={{ background: '#0e0d0b', border: '0.5px solid rgba(184,146,42,0.18)', fontSize: 11 }} />
            <Bar dataKey="count" radius={[0, 2, 2, 0]}>
              {TOP_DISHES.map((_, i) => <Cell key={i} fill={i === 0 ? '#b8922a' : 'rgba(184,146,42,0.35)'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* WEEKLY RESERVATIONS */}
      <div className="sp-card" style={{ padding: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>Reservaciones por día</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={WEEKLY_RES}>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#7a7670' }} />
            <YAxis tick={{ fontSize: 10, fill: '#7a7670' }} />
            <Tooltip contentStyle={{ background: '#0e0d0b', border: '0.5px solid rgba(184,146,42,0.18)', fontSize: 11 }} />
            <Line type="monotone" dataKey="res" stroke="#b8922a" strokeWidth={1.5} dot={{ fill: '#b8922a', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
