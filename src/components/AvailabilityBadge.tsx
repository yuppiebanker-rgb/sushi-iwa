import { useState, useEffect } from 'react';

export default function AvailabilityBadge() {
  const [available, setAvailable] = useState<number | null>(null);
  const [isTonight, setIsTonight] = useState(false);

  useEffect(() => {
    const day = new Date().getDay(); // 0=Sun, 2=Tue
    if (day === 2) { setAvailable(0); return; } // Closed Tuesdays
    setIsTonight(true);

    // Read from staff portal localStorage (set by Dashboard)
    const staffData = localStorage.getItem('iwa_availability_mty');
    if (staffData) {
      try {
        const { mesas, timestamp } = JSON.parse(staffData);
        // Only use if updated within last 2 hours
        if (Date.now() - timestamp < 7200000) {
          setAvailable(mesas);
          return;
        }
      } catch { /* ignore bad data */ }
    }

    // Simulated: varies by time of day and day of week
    const hour = new Date().getHours();
    const isFriSat = day === 5 || day === 6;
    if (hour < 14) setAvailable(isFriSat ? 4 : 8);
    else if (hour < 18) setAvailable(isFriSat ? 2 : 5);
    else if (hour < 20) setAvailable(isFriSat ? 1 : 3);
    else setAvailable(isFriSat ? 0 : 1);
  }, []);

  if (!isTonight || available === null) return null;

  if (available === 0) return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: 'rgba(139,26,26,0.15)',
      border: '0.5px solid rgba(139,26,26,0.35)',
      padding: '8px 16px',
      fontSize: '11px', letterSpacing: '0.15em',
      color: '#e88080', textTransform: 'uppercase',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b1a1a', flexShrink: 0 }} />
      Completos esta noche &middot; Martes cerrado
    </div>
  );

  const isUrgent = available <= 2;

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: isUrgent ? 'rgba(184,146,42,0.12)' : 'rgba(26,92,42,0.12)',
      border: `0.5px solid ${isUrgent ? 'rgba(184,146,42,0.35)' : 'rgba(26,92,42,0.3)'}`,
      padding: '8px 16px',
      fontSize: '11px', letterSpacing: '0.15em',
      color: isUrgent ? '#b8922a' : '#4ade80',
      textTransform: 'uppercase',
      animation: isUrgent ? 'urgentPulse 2s ease-in-out infinite' : 'none',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isUrgent ? '#b8922a' : '#22c55e',
        flexShrink: 0,
        animation: isUrgent ? 'none' : 'blink 1.5s ease-in-out infinite',
      }} />
      {isUrgent
        ? `Última${available > 1 ? 's' : ''} ${available} mesa${available > 1 ? 's' : ''} esta noche`
        : `${available} mesas disponibles esta noche`}
      <style>{`
        @keyframes urgentPulse { 0%,100%{opacity:.85}50%{opacity:1} }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:.4} }
      `}</style>
    </div>
  );
}
