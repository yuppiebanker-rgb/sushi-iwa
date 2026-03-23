import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './staff.css';

const LOCS = [
  { id: 'mty', label: 'Monterrey' },
  { id: 'saltillo', label: 'Saltillo' },
  { id: 'hmo', label: 'Hermosillo' },
  { id: 'obregon', label: 'Cd. Obregón' },
];

const DESTINATIONS = [
  { path: '/menu', label: 'Menú completo' },
  { path: '/#reservar', label: 'Reservaciones' },
  { path: '/galeria', label: 'Galería' },
];

export default function QRGenerator() {
  const [loc, setLoc] = useState(LOCS[0].id);
  const [dest, setDest] = useState(DESTINATIONS[0].path);
  const [customLabel, setCustomLabel] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  const url = `https://sushiiwa.mx${dest}?loc=${loc}${customLabel ? `&table=${encodeURIComponent(customLabel)}` : ''}`;

  const download = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `qr-iwa-${loc}-${customLabel || 'general'}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const print = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><body style="display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#fff">
      <div style="text-align:center"><img src="${canvas.toDataURL()}" width="300" /><p style="font-family:sans-serif;font-size:14px;margin-top:12px">${customLabel || 'Sushi IWA'}</p></div>
    </body></html>`);
    w.document.close();
    w.print();
  };

  const downloadBarSeat = (seat: number) => {
    setCustomLabel(`Barra ${seat}`);
    setLoc('mty');
    setDest('/menu');
    setTimeout(() => download(), 150);
  };

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">QR Codes</div>
          <h1 className="sp-title">Generador de QR</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', display: 'block', marginBottom: 4 }}>Ubicación</label>
          <select className="sp-select" style={{ width: '100%' }} value={loc} onChange={e => setLoc(e.target.value)}>
            {LOCS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', display: 'block', marginBottom: 4 }}>Destino</label>
          <select className="sp-select" style={{ width: '100%' }} value={dest} onChange={e => setDest(e.target.value)}>
            {DESTINATIONS.map(d => <option key={d.path} value={d.path}>{d.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', display: 'block', marginBottom: 4 }}>Etiqueta</label>
          <input className="sp-input" placeholder="Mesa 4 · MTY" value={customLabel} onChange={e => setCustomLabel(e.target.value)} />
        </div>
      </div>

      <div ref={qrRef} style={{ textAlign: 'center', padding: 32, background: '#fff', marginBottom: 20 }}>
        <QRCodeCanvas value={url} size={220} bgColor="#ffffff" fgColor="#0c0b09" level="M" />
        <div style={{ fontSize: 11, color: '#333', marginTop: 10 }}>{customLabel || 'Sushi IWA'}</div>
        <div style={{ fontSize: 9, color: '#999', marginTop: 2 }}>{url}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
        <button className="sp-btn sp-btn--gold" onClick={download}>Descargar PNG</button>
        <button className="sp-btn" onClick={print}>Imprimir</button>
      </div>

      {/* QUICK BAR SEATS */}
      <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
        Generación rápida — Barra MTY
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <button key={i} className="sp-btn sp-btn--sm" onClick={() => downloadBarSeat(i + 1)} style={{ textAlign: 'center' }}>
            Barra {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
