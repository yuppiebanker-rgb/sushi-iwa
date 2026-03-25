import { Link } from 'react-router-dom';

export function AppErrorFallback() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0c0b09',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '24px', textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: '48px', color: 'rgba(184,146,42,0.4)',
      }}>いわ</div>

      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(22px,4vw,36px)',
        fontStyle: 'italic', color: '#f4efe6',
      }}>Algo salió mal.</div>

      <p style={{
        fontSize: '13px', color: '#7a7670',
        maxWidth: '360px', lineHeight: 1.65,
      }}>
        Ocurrió un error inesperado. Nuestro equipo fue notificado
        automáticamente. Intenta recargar la página.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#b8922a', border: 'none',
            padding: '12px 24px', color: '#0c0b09',
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: '"DM Sans"',
          }}
        >Recargar</button>
        <Link to="/" style={{
          border: '0.5px solid rgba(184,146,42,0.3)',
          padding: '12px 24px', color: '#b8922a',
          fontSize: '11px', letterSpacing: '0.2em',
          textTransform: 'uppercase', textDecoration: 'none',
          fontFamily: '"DM Sans"',
        }}>Ir al inicio</Link>
      </div>

      <a
        href="https://wa.me/528111239849"
        style={{
          fontSize: '11px', color: '#7a7670',
          textDecoration: 'none',
        }}
      >¿Necesitas reservar? Escríbenos por WhatsApp →</a>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0c0b09',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '20px', textAlign: 'center', padding: '20px',
    }}>
      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: '64px', color: 'rgba(184,146,42,0.25)',
      }}>いわ</div>
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(18px,3vw,28px)',
        fontStyle: 'italic', color: '#f4efe6',
      }}>Esta página no existe.</div>
      <p style={{ fontSize: '12px', color: '#7a7670', maxWidth: '280px' }}>
        Pero nuestro menú sí.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/menu" style={{
          background: '#b8922a', padding: '12px 24px',
          color: '#0c0b09', textDecoration: 'none',
          fontSize: '10px', letterSpacing: '0.2em',
          textTransform: 'uppercase', fontFamily: '"DM Sans"',
        }}>Ver Menú</Link>
        <Link to="/" style={{
          border: '0.5px solid rgba(184,146,42,0.25)',
          padding: '12px 24px', color: '#b8922a',
          textDecoration: 'none', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: '"DM Sans"',
        }}>Inicio</Link>
      </div>
    </div>
  );
}
