import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import SEO from '../components/SEO';
import { track } from '../lib/analytics';

export default function ReservacionConfirmada() {
  const [params] = useSearchParams();
  const rid = params.get('rid') ?? '';

  useEffect(() => {
    track('reservation_deposit_completed', { reservation_id: rid });
  }, [rid]);

  const calendarDate = params.get('date') ?? '';
  const calendarTime = params.get('time') ?? '19:00';

  const googleCalUrl = calendarDate
    ? (() => {
        const start = `${calendarDate.replace(/-/g, '')}T${calendarTime.replace(':', '')}00`;
        const endHour = String(Number(calendarTime.split(':')[0]) + 2).padStart(2, '0');
        const end = `${calendarDate.replace(/-/g, '')}T${endHour}${calendarTime.split(':')[1]}00`;
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Reservación Sushi IWA')}&dates=${start}/${end}&location=${encodeURIComponent('Sushi IWA, Av. Fundadores 955, San Pedro Garza García')}&details=${encodeURIComponent('Tu depósito ha sido confirmado. ¡Te esperamos!')}`;
      })()
    : null;

  return (
    <>
      <SEO
        title="Reservación Confirmada — Sushi IWA"
        description="Tu reservación ha sido confirmada con depósito."
        path="/reservacion-confirmada"
      />

      <div style={{
        minHeight: '100vh',
        background: '#0c0b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '36px', fontWeight: 200,
            color: '#b8922a',
            marginBottom: '24px',
          }}>いわ</div>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f4efe6',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            ¡Reservación<br />confirmada!
          </h1>

          <p style={{
            fontSize: '14px',
            color: '#7a7670',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            Tu depósito ha sido procesado correctamente.
            Recibirás un correo de confirmación con los detalles.
          </p>

          <div style={{
            background: '#141210',
            border: '0.5px solid rgba(184,146,42,0.25)',
            padding: '24px',
            marginBottom: '28px',
            textAlign: 'left',
          }}>
            <div style={{ height: '2px', background: '#b8922a', marginBottom: '16px' }} />
            <div style={{
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#b8922a',
              marginBottom: '12px',
            }}>Detalles de reservación</div>
            <p style={{ fontSize: '13px', color: '#f4efe6', lineHeight: 1.8 }}>
              Referencia: <strong style={{ color: '#b8922a' }}>{rid || '—'}</strong><br />
              El depósito se aplica a tu consumo al llegar.<br />
              Cancelación gratuita con 24hr de anticipación.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {googleCalUrl && (
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"DM Sans"', fontSize: '11px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#f4efe6',
                  border: '0.5px solid rgba(244,239,230,0.4)',
                  padding: '14px 24px',
                  textDecoration: 'none',
                  minHeight: '44px', display: 'flex', alignItems: 'center',
                }}
              >
                Agregar al Calendario
              </a>
            )}
            <a
              href="https://wa.me/528111239849"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"DM Sans"', fontSize: '11px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#0c0b09',
                background: '#b8922a', border: 'none',
                padding: '14px 24px',
                textDecoration: 'none',
                minHeight: '44px', display: 'flex', alignItems: 'center',
              }}
            >
              Contactar por WhatsApp
            </a>
          </div>

          <Link to="/" style={{
            display: 'inline-block',
            marginTop: '32px',
            fontSize: '11px', letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#7a7670',
            textDecoration: 'none',
          }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
