import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Newsletter() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 32px',
      background: '#0c0b09',
    }}>
      <SEO
        title="Novedades IWA — Sushi IWA"
        description="Ya estás suscrito a las novedades de Sushi IWA. Menú de temporada, eventos exclusivos y más."
        path="/novedades"
      />
      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: '10px', fontWeight: 200,
        letterSpacing: '0.5em', color: '#b8922a',
        marginBottom: '20px',
      }}>お知らせ</div>
      <h1 style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(32px, 5vw, 52px)',
        fontWeight: 300, color: '#f4efe6',
        lineHeight: 1.15, marginBottom: '16px',
      }}>Ya estás suscrito a<br /><em style={{ fontStyle: 'italic', color: '#b8922a' }}>Novedades IWA</em></h1>
      <p style={{
        fontSize: '15px', color: '#7a7670',
        lineHeight: 1.7, maxWidth: '440px',
        marginBottom: '40px',
      }}>
        Recibirás actualizaciones sobre el menú de temporada,
        eventos exclusivos y reservaciones anticipadas directamente por WhatsApp.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/menu" style={{
          background: 'transparent',
          border: '0.5px solid rgba(184,146,42,0.35)',
          color: '#b8922a', padding: '14px 28px',
          fontSize: '11px', letterSpacing: '0.2em',
          textTransform: 'uppercase', textDecoration: 'none',
          fontFamily: '"DM Sans", sans-serif',
          transition: 'background 0.2s ease',
        }}>Ver Menú →</Link>
        <Link to="/#reservar" style={{
          background: '#b8922a', color: '#0c0b09',
          border: 'none', padding: '14px 28px',
          fontSize: '11px', letterSpacing: '0.2em',
          textTransform: 'uppercase', textDecoration: 'none',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          transition: 'background 0.2s ease',
        }}>Reservar Mesa →</Link>
      </div>
    </div>
  );
}
