import { useState, useEffect, useCallback } from 'react';
import { track, trackReservationStep } from '../lib/analytics';
import './ReservationFlow.css';
import AvailabilityBadge from './AvailabilityBadge';
import BirthdayCapture from './BirthdayCapture';
import { supabase } from '../lib/supabase';

const LOCATIONS = [
  { id: 'mty', city: 'Monterrey', state: 'Nuevo León', address: 'Av. Fundadores 955, Sienna Tower 2°', phone: '+528111239849', wa: '528111239849', hours: 'L·Mi·J·V·S·D 1:45–10:30pm', closed: [2] },
  { id: 'sal', city: 'Saltillo', state: 'Coahuila', address: '@iwa.saltillo', phone: '', wa: '', hours: 'Lu–Mi 1:30–11:30pm · J–S hasta 12:30am', closed: [] },
  { id: 'hmo', city: 'Hermosillo', state: 'Sonora', address: '@iwa.hmo', phone: '+526621918131', wa: '526621918131', hours: 'M–Mi 1–12am · J–S 1pm–2am', closed: [1] },
  { id: 'obr', city: 'Cd. Obregón', state: 'Sonora', address: '', phone: '', wa: '', hours: 'Horario variable', closed: [] },
];

const BASE_TIMES = ['1:45 PM', '3:00 PM', '5:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
const SAT_EXTRA = '10:30 PM';

const OCCASION_EMOJI: Record<string, string> = { 'Cumpleaños': '🎂', 'Aniversario': '💍', 'Cena de negocios': '💼', 'Propuesta de matrimonio': '💒', 'Otra celebración': '🎉', 'birthday': '🎂', 'anniversary': '💍', 'business': '🥂', 'graduation': '🎓' };

function formatDate(d: string) {
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function generateICS(data: { date: string; time: string; location: string; name: string }) {
  const [h, m] = data.time.replace(/[^\d:]/g, '').split(':').map(Number);
  const isPM = data.time.includes('PM');
  const hour24 = isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h;
  const dt = new Date(data.date + 'T12:00:00');
  dt.setHours(hour24, m || 0, 0);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const stamp = `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
  const end = new Date(dt.getTime() + 7200000);
  const endStamp = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`;
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${stamp}\nDTEND:${endStamp}\nSUMMARY:Reservación Sushi IWA\nDESCRIPTION:${data.name} en ${data.location}\nLOCATION:Sushi IWA ${data.location}\nEND:VEVENT\nEND:VCALENDAR`;
}

export function getPreOrder(): string[] {
  try { return JSON.parse(sessionStorage.getItem('iwa-preorder') || '[]'); } catch { return []; }
}
export function addPreOrder(name: string) {
  const list = getPreOrder();
  if (!list.includes(name)) { list.push(name); sessionStorage.setItem('iwa-preorder', JSON.stringify(list)); }
}
export function clearPreOrder() { sessionStorage.removeItem('iwa-preorder'); }

interface Props {
  open: boolean;
  onClose: () => void;
  preNote?: string;
}

export default function ReservationFlow({ open, onClose, preNote }: Props) {
  const [step, setStep] = useState(1);
  const [loc, setLoc] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Ninguna');
  const [occasionData, setOccasionData] = useState<{ type: string; date?: string } | null>(null);
  const [request, setRequest] = useState(preNote || '');
  const [firstTime, setFirstTime] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    if (!open) { setStep(1); setSent(false); setCountdown(8); setErrors({}); }
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (preNote && open) setRequest(preNote);
  }, [preNote, open]);

  useEffect(() => {
    if (!sent) return;
    if (countdown <= 0) { onClose(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sent, countdown, onClose]);

  const tryClose = useCallback(() => {
    if (step > 1 && !sent) {
      if (confirm('¿Salir sin reservar?')) onClose();
    } else {
      onClose();
    }
  }, [step, sent, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') tryClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, tryClose]);

  if (!open) return null;

  const selLoc = LOCATIONS.find(l => l.id === loc);
  const isSat = date ? new Date(date + 'T12:00:00').getDay() === 6 : false;
  const times = isSat ? [...BASE_TIMES, SAT_EXTRA] : BASE_TIMES;
  const preOrder = getPreOrder();

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!loc) e.loc = 'Selecciona una ubicación';
    if (!date) e.date = 'Selecciona una fecha';
    if (!time) e.time = 'Selecciona un horario';
    if (date && selLoc) {
      const day = new Date(date + 'T12:00:00').getDay();
      if (selLoc.closed.includes(day)) e.date = 'El restaurante está cerrado ese día';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Ingresa tu nombre';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) e.phone = 'Ingresa un WhatsApp válido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && validateStep1()) {
      trackReservationStep(2, { location: selLoc?.city, time, party_size: guests });
      setStep(2); setErrors({});
    } else if (step === 2 && validateStep2()) {
      trackReservationStep(3);
      setStep(3); setErrors({});
    }
  };

  const sendWhatsApp = () => {
    if (!selLoc) return;
    let msg = `Hola, quisiera reservar en Sushi IWA ${selLoc.city}.\n📅 ${formatDate(date)} a las ${time}\n👥 ${guests} personas\n👤 ${name}`;
    if (occasionData) msg += `\n${OCCASION_EMOJI[occasion] || '🎉'} ${occasion}`;
    if (request.trim()) msg += `\n📝 ${request}`;
    if (preOrder.length > 0) msg += `\n🍣 Pre-orden: ${preOrder.join(', ')}`;
    msg += '\nGracias 🙏';
    const wa = selLoc.wa || '528111239849';
    track('reservation_whatsapp_opened', { location: selLoc.city, time });
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
    clearPreOrder();

    // Save occasion data for birthday/anniversary auto-WhatsApp
    if (supabase && occasionData?.date) {
      supabase.from('guests').upsert({
        phone: phone.replace(/\D/g, ''),
        name,
        special_occasions: {
          [occasionData.type]: occasionData.date,
        },
      }, { onConflict: 'phone' }).then(() => {});
    }

    setSent(true);
  };

  const downloadICS = () => {
    const ics = generateICS({ date, time, location: selLoc?.city || '', name });
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sushi-iwa-reservacion.ics';
    a.click();
  };

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="rf-overlay" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('rf-overlay')) tryClose(); }}>
      <div className="rf-modal">
        <button className="rf-close" onClick={tryClose}>✕</button>

        {/* PROGRESS BAR */}
        {!sent && (
          <div className="rf-progress">
            <div className="rf-progress-bar" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        )}

        {/* SUCCESS SCREEN */}
        {sent ? (
          <div className="rf-success">
            <div className="rf-success-jp">岩</div>
            <h2 className="rf-success-title">¡Tu solicitud fue enviada!</h2>
            <p className="rf-success-sub">El equipo IWA confirmará tu reservación por WhatsApp en los próximos minutos.</p>
            <div className="rf-success-actions">
              <button className="rf-btn rf-btn--gold" onClick={downloadICS}>Agregar al calendario</button>
              <button className="rf-btn rf-btn--ghost" onClick={onClose}>Ver el menú mientras esperas →</button>
            </div>
            <div className="rf-countdown">Cerrando en {countdown}s</div>
          </div>
        ) : step === 1 ? (
          /* ── STEP 1: Location & Date ── */
          <div className="rf-step">
            <div className="rf-step-label">Paso 1 de 3</div>
            <h2 className="rf-step-title">¿Dónde y cuándo?</h2>

            <div className="rf-locs">
              {LOCATIONS.map(l => (
                <button key={l.id} className={`rf-loc ${loc === l.id ? 'rf-loc--sel' : ''}`} onClick={() => setLoc(l.id)}>
                  <div className="rf-loc-city">{l.city}</div>
                  <div className="rf-loc-state">{l.state}</div>
                  <div className="rf-loc-hours">{l.hours}</div>
                </button>
              ))}
              <div className="rf-loc rf-loc--soon">
                <div className="rf-loc-city" style={{ opacity: 0.4 }}>Mazatlán</div>
                <div className="rf-loc-state">Próximamente</div>
              </div>
            </div>
            {errors.loc && <div className="rf-err">{errors.loc}</div>}

            <label className="rf-label">Fecha</label>
            <input type="date" className="rf-input iwa-input" value={date} min={minDate} onChange={e => setDate(e.target.value)} />
            {errors.date && <div className="rf-err">{errors.date}</div>}

            <label className="rf-label">Horario</label>
            <div className="rf-times">
              {times.map(t => (
                <button key={t} className={`rf-time ${time === t ? 'rf-time--sel' : ''}`} onClick={() => setTime(t)}>{t}</button>
              ))}
            </div>
            {errors.time && <div className="rf-err">{errors.time}</div>}

            <div style={{ marginTop: 12 }}><AvailabilityBadge /></div>
            <button className="rf-btn rf-btn--gold rf-btn--full" onClick={next}>Siguiente →</button>
          </div>
        ) : step === 2 ? (
          /* ── STEP 2: Guest Details ── */
          <div className="rf-step">
            <div className="rf-step-label">Paso 2 de 3</div>
            <h2 className="rf-step-title">¿Quién viene?</h2>

            <label className="rf-label">Personas</label>
            <div className="rf-guests">
              {[1,2,3,4,5,6,7,8].map(n => (
                <button key={n} className={`rf-guest ${guests === n ? 'rf-guest--sel' : ''}`} onClick={() => setGuests(n)}>{n === 8 ? '8+' : n}</button>
              ))}
            </div>

            <label className="rf-label">Nombre *</label>
            <input className="rf-input iwa-input" placeholder="Tu nombre completo" value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <div className="rf-err">{errors.name}</div>}

            <label className="rf-label">WhatsApp *</label>
            <div className="rf-phone-wrap">
              <span className="rf-phone-prefix">+52</span>
              <input className="rf-input rf-input--phone iwa-input" placeholder="81 1123 9849" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            {errors.phone && <div className="rf-err">{errors.phone}</div>}

            <label className="rf-label">Email (opcional)</label>
            <input className="rf-input iwa-input" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />

            <BirthdayCapture onChange={(data) => {
              setOccasionData(data);
              setOccasion(data ? data.type : 'Ninguna');
            }} />

            <label className="rf-label">Solicitudes especiales</label>
            <textarea className="rf-textarea" placeholder="Alergias, preferencias, etc." maxLength={200} value={request} onChange={e => setRequest(e.target.value)} />
            <div className="rf-char-count">{request.length}/200</div>

            <label className="rf-toggle-row">
              <input type="checkbox" checked={firstTime} onChange={e => setFirstTime(e.target.checked)} />
              <span>¿Primera vez en IWA?</span>
            </label>
            {firstTime && <div className="rf-welcome">¡Bienvenido! Nuestro equipo se encargará de que tu primera experiencia sea memorable. いわ</div>}

            <div className="rf-step-actions">
              <button className="rf-btn rf-btn--ghost" onClick={() => setStep(1)}>← Atrás</button>
              <button className="rf-btn rf-btn--gold" onClick={next}>Siguiente →</button>
            </div>
          </div>
        ) : (
          /* ── STEP 3: Confirmation ── */
          <div className="rf-step">
            <div className="rf-step-label">Paso 3 de 3 ✓</div>
            <div className="rf-confirm-card">
              <div className="rf-confirm-jp">岩</div>
              <div className="rf-confirm-loc">{selLoc?.city}</div>
              <div className="rf-confirm-addr">{selLoc?.address}</div>
              <div className="rf-confirm-divider" />
              <div className="rf-confirm-date">{formatDate(date)}</div>
              <div className="rf-confirm-time">{time}</div>
              <div className="rf-confirm-guests">{guests} persona{guests > 1 ? 's' : ''}</div>
              <div className="rf-confirm-name">{name}</div>
              {occasionData && <div className="rf-confirm-occasion">{OCCASION_EMOJI[occasion] || '🎉'} {occasion}</div>}
              {preOrder.length > 0 && (
                <div className="rf-confirm-preorder">
                  <div className="rf-confirm-preorder-label">Pre-orden:</div>
                  {preOrder.map((p, i) => <div key={i} className="rf-confirm-preorder-item">🍣 {p}</div>)}
                </div>
              )}
            </div>

            <button className="rf-btn rf-btn--gold rf-btn--full btn-whatsapp" onClick={sendWhatsApp}>Confirmar por WhatsApp</button>
            {selLoc?.phone && (
              <a className="rf-btn rf-btn--ghost rf-btn--full" href={`tel:${selLoc.phone}`} style={{ textAlign: 'center', marginTop: 8 }}>
                Llamar al restaurante
              </a>
            )}
            <p className="rf-disclaimer">Tu reservación se confirma cuando el equipo IWA responda tu WhatsApp.</p>

            <button className="rf-btn rf-btn--ghost" onClick={() => setStep(2)} style={{ marginTop: 8 }}>← Atrás</button>
          </div>
        )}
      </div>
    </div>
  );
}
