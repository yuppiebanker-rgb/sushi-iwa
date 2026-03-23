import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './staff.css';

const CORRECT_PIN = '1924';

export default function StaffLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isStaffAuth') === 'true') {
      navigate('/iwa-staff/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setError(false);
    setPin(next);
    if (next.length === 4) {
      if (next === CORRECT_PIN) {
        sessionStorage.setItem('isStaffAuth', 'true');
        navigate('/iwa-staff/dashboard', { replace: true });
      } else {
        setError(true);
        setTimeout(() => { setPin(''); setError(false); }, 800);
      }
    }
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError(false);
  };

  return (
    <div className="slogin">
      <Helmet><meta name="robots" content="noindex" /></Helmet>
      <div className="slogin-inner">
        <div className="slogin-logo">岩</div>
        <div className="slogin-label">Staff Portal</div>

        <div className={`slogin-dots ${error ? 'slogin-shake' : ''}`}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`slogin-dot ${i < pin.length ? 'slogin-dot--filled' : ''}`} />
          ))}
        </div>

        {error && <div className="slogin-err">PIN incorrecto</div>}

        <div className="slogin-pad">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, i) => (
            key === '' ? <div key={i} /> :
            key === '⌫' ? (
              <button key={i} className="slogin-key slogin-key--del" onClick={handleDelete}>{key}</button>
            ) : (
              <button key={i} className="slogin-key" onClick={() => handleDigit(key)}>{key}</button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
