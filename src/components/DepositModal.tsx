import { useState } from 'react';
import { type DepositConfig, createDepositSession } from '../lib/deposit';
import { track } from '../lib/analytics';

interface Props {
  config: DepositConfig;
  reservationId: string;
  guestName: string;
  guestEmail: string;
  date: string;
  time: string;
  party: number;
  onSkip: () => void;
  onSuccess: () => void;
}

export default function DepositModal({
  config, reservationId, guestName, guestEmail,
  date, time, party, onSkip, onSuccess: _onSuccess,
}: Props) {
  void _onSuccess; // kept as prop interface requires it
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    track('reservation_deposit_started', { amount: config.amount });
    try {
      const { url } = await createDepositSession({
        reservationId, amount: config.amount,
        guestName, guestEmail, date, time, party,
      });
      window.location.href = url;
    } catch {
      alert('Error al procesar el pago. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#141210',
      border: '0.5px solid rgba(184,146,42,0.25)',
      padding: '28px',
      marginTop: '16px',
    }}>
      <div style={{ height: '2px', background: '#b8922a', marginBottom: '20px' }} />

      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '22px', fontStyle: 'italic',
        color: '#f4efe6', marginBottom: '8px',
      }}>
        Confirma tu reservación
      </div>

      <p style={{
        fontSize: '13px', color: '#7a7670',
        lineHeight: 1.65, marginBottom: '20px',
      }}>
        Para garantizar tu lugar ({config.reason}), solicitamos
        un depósito de <strong style={{ color: '#b8922a' }}>${config.amount} MXN</strong>.
        Este monto se aplica a tu cuenta al llegar.
      </p>

      <div style={{
        background: 'rgba(184,146,42,0.05)',
        border: '0.5px solid rgba(184,146,42,0.15)',
        padding: '14px 16px',
        marginBottom: '20px',
        fontSize: '12px', color: '#7a7670',
        lineHeight: 1.7,
      }}>
        ✓ El depósito se aplica a tu consumo<br />
        ✓ Cancelación gratuita con 24hr de anticipación<br />
        ✓ Pago seguro vía Stripe (tarjeta / OXXO / SPEI)
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={handleDeposit}
          disabled={loading}
          style={{
            flex: 1,
            background: loading ? 'rgba(184,146,42,0.4)' : '#b8922a',
            border: 'none', color: '#0c0b09',
            padding: '14px 24px', cursor: 'pointer',
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontWeight: 500,
            minHeight: '44px', fontFamily: '"DM Sans"',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Procesando...' : `Pagar Depósito $${config.amount} MXN →`}
        </button>
        <button
          onClick={onSkip}
          style={{
            background: 'none',
            border: '0.5px solid rgba(184,146,42,0.2)',
            color: '#7a7670', padding: '14px 20px',
            cursor: 'pointer', fontSize: '11px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            minHeight: '44px', fontFamily: '"DM Sans"',
          }}
        >
          Pagar al llegar
        </button>
      </div>

      <p style={{
        fontSize: '10px', color: '#7a7670',
        marginTop: '12px', textAlign: 'center',
        letterSpacing: '0.05em',
      }}>
        Pago seguro · Stripe · Los datos de tu tarjeta no son almacenados por IWA
      </p>
    </div>
  );
}
