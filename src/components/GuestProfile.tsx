import { useEffect, useState } from 'react';
import { getGuestLocal, type GuestMemory } from '../lib/guest-memory';

export default function GuestProfile() {
  const [guest, setGuest] = useState<GuestMemory | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const g = getGuestLocal();
    if (g?.name && g?.visitCount && g.visitCount > 1) {
      setGuest(g);
      const showTimer = setTimeout(() => setVisible(true), 1500);
      const hideTimer = setTimeout(() => setVisible(false), 7500);
      return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }
  }, []);

  if (!guest) return null;

  const lastVisitDate = guest.lastVisit
    ? new Date(guest.lastVisit).toLocaleDateString('es-MX', {
        day: 'numeric', month: 'long',
      })
    : null;

  const stamps = guest.loyaltyStamps || 0;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      zIndex: 300,
      background: '#141210',
      border: '0.5px solid rgba(184,146,42,0.3)',
      padding: '14px 18px',
      maxWidth: '280px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-12px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      pointerEvents: visible ? 'all' : 'none',
    }}>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute', top: '8px', right: '10px',
          background: 'none', border: 'none',
          color: '#7a7670', cursor: 'pointer',
          fontSize: '14px', lineHeight: 1,
          minHeight: 'auto', padding: '0',
        }}
      >✕</button>

      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: '9px', color: '#b8922a',
        letterSpacing: '0.3em', marginBottom: '6px',
      }}>おかえり</div>

      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '17px', fontStyle: 'italic',
        color: '#f4efe6', marginBottom: '4px',
      }}>
        Bienvenido de vuelta{guest.name ? `, ${guest.name}` : ''}.
      </div>

      {lastVisitDate && (
        <div style={{ fontSize: '11px', color: '#7a7670' }}>
          Tu última visita: {lastVisitDate}
        </div>
      )}

      {stamps > 0 && (
        <div style={{
          marginTop: '10px', padding: '8px 10px',
          background: 'rgba(184,146,42,0.06)',
          border: '0.5px solid rgba(184,146,42,0.15)',
          fontSize: '11px', color: '#b8922a',
        }}>
          {stamps}/10 visitas · Club IWA{' '}
          {'✦'.repeat(stamps)}{'○'.repeat(Math.max(0, 10 - stamps))}
        </div>
      )}
    </div>
  );
}
