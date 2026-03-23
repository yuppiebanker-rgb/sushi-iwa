import { useState, useEffect } from 'react';

const QUICK_REPLIES = [
  { label: '📅 Hacer una reservación', message: 'Hola! Me gustaría hacer una reservación en Sushi IWA.' },
  { label: '🍣 Ver el menú completo', message: 'Hola! ¿Me pueden compartir el menú de Sushi IWA?' },
  { label: '📍 Cómo llegar', message: 'Hola! ¿Cómo puedo llegar a Sushi IWA Monterrey?' },
  { label: '🎂 Evento especial', message: 'Hola! Quisiera organizar un evento especial en Sushi IWA. ¿Me pueden dar información?' },
  { label: '❓ Otra pregunta', message: 'Hola! Tengo una pregunta sobre Sushi IWA.' },
];

const WA_NUMBER = '528111239849';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 4000);
    const t2 = setTimeout(() => setShowGreeting(true), 7000);
    const t3 = setTimeout(() => setShowGreeting(false), 12000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const sendMessage = (message: string) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setOpen(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      right: '24px',
      zIndex: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px',
    }}>
      {/* Greeting bubble */}
      {showGreeting && !open && (
        <div style={{
          background: '#1a1714',
          border: '0.5px solid rgba(184,146,42,0.25)',
          padding: '12px 16px',
          maxWidth: '220px',
          fontSize: '13px',
          color: '#f4efe6',
          fontFamily: '"DM Sans", sans-serif',
          lineHeight: 1.5,
          animation: 'fadeInUp 0.35s ease',
          cursor: 'pointer',
        }} onClick={() => { setOpen(true); setShowGreeting(false); }}>
          <div style={{ fontWeight: 500, marginBottom: '4px', color: '#b8922a' }}>
            いわ Sushi IWA
          </div>
          ¡Hola! ¿En qué te podemos ayudar? 🍣
          <div style={{ fontSize: '10px', color: '#7a7670', marginTop: '6px' }}>
            Respondemos en minutos
          </div>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div style={{
          background: '#141210',
          border: '0.5px solid rgba(184,146,42,0.25)',
          width: '300px',
          animation: 'fadeInUp 0.32s cubic-bezier(0.22,1,0.36,1)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: '#1a1714',
            borderBottom: '0.5px solid rgba(184,146,42,0.15)',
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'rgba(184,146,42,0.12)',
              border: '0.5px solid rgba(184,146,42,0.3)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Noto Serif JP", serif',
              fontSize: '16px', color: '#b8922a',
            }}>いわ</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#f4efe6' }}>
                Sushi IWA
              </div>
              <div style={{ fontSize: '10px', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 5, height: 5, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
                Responde en minutos
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              color: '#7a7670', cursor: 'pointer', fontSize: '16px',
              padding: '0', minHeight: 'auto',
            }}>✕</button>
          </div>

          {/* Message bubble */}
          <div style={{ padding: '16px', background: '#0c0b09' }}>
            <div style={{
              background: '#1a1714',
              border: '0.5px solid rgba(184,146,42,0.12)',
              padding: '12px 14px',
              fontSize: '13px', color: '#f4efe6',
              lineHeight: 1.55, marginBottom: '16px',
            }}>
              ¡Hola! 👋 ¿En qué te podemos ayudar hoy?
              Selecciona una opción o escríbenos directamente.
            </div>

            {/* Quick replies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUICK_REPLIES.map((reply, i) => (
                <button key={i} onClick={() => sendMessage(reply.message)} style={{
                  background: 'rgba(184,146,42,0.06)',
                  border: '0.5px solid rgba(184,146,42,0.2)',
                  color: '#f4efe6',
                  padding: '10px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                  minHeight: '44px',
                }}>
                  {reply.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main WhatsApp button */}
      <button onClick={() => { setOpen(!open); setShowGreeting(false); }}
        aria-label="Abrir chat WhatsApp"
        style={{
          width: '54px', height: '54px',
          borderRadius: '50%',
          background: open ? '#1a1714' : '#25D366',
          border: open ? '0.5px solid rgba(184,146,42,0.3)' : 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease, background 0.2s ease',
          animation: !open ? 'waPulse 3s ease-in-out infinite' : 'none',
        }}>
        {open ? (
          <span style={{ color: '#b8922a', fontSize: '20px' }}>✕</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}50%{box-shadow:0 0 0 10px rgba(37,211,102,0.15)} }
      `}</style>
    </div>
  );
}
