import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0c0b09', color: '#f4efe6', textAlign: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ fontFamily: '"Noto Serif JP", serif', fontSize: '48px', color: '#b8922a', marginBottom: '16px' }}>いわ</div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '32px', fontWeight: 300, marginBottom: '12px' }}>
        Página no encontrada
      </h1>
      <p style={{ fontSize: '14px', color: '#7a7670', marginBottom: '32px' }}>
        La página que buscas no existe o fue movida.
      </p>
      <Link to="/" style={{
        fontFamily: '"DM Sans"', fontSize: '10px', letterSpacing: '0.25em',
        textTransform: 'uppercase', color: '#b8922a', textDecoration: 'none',
        borderBottom: '0.5px solid rgba(184,146,42,0.4)', paddingBottom: '3px',
      }}>
        Volver al inicio →
      </Link>
    </div>
  );
}
