import { useState } from 'react';
import './MazatlanNotify.css';

interface Props {
  compact?: boolean;
}

export default function MazatlanNotify({ compact }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xpwzgkqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'mazatlan-notify' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (compact) {
    return (
      <div className="mzn mzn--compact">
        {status === 'success' ? (
          <span className="mzn-ok">¡Listo! Te avisamos. いわ</span>
        ) : (
          <form className="mzn-inline" onSubmit={handleSubmit}>
            <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Notifícame'}
            </button>
          </form>
        )}
        {status === 'error' && <span className="mzn-err">Algo salió mal. Intenta de nuevo.</span>}
      </div>
    );
  }

  return (
    <div className="mzn">
      <div className="mzn-jp">まもなく</div>
      <h3 className="mzn-title">Mazatlán · Próximamente</h3>
      <p className="mzn-copy">Sé el primero en saber cuándo abrimos en Mazatlán.</p>

      {status === 'success' ? (
        <div className="mzn-success">¡Listo! Te avisamos en cuanto abramos. いわ</div>
      ) : (
        <form className="mzn-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : 'Notifícame'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="mzn-error">Algo salió mal. Intenta de nuevo.</p>}
    </div>
  );
}
