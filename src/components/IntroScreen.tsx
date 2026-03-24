import { useState, useEffect } from 'react';

export default function IntroScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in');

  useEffect(() => {
    if (sessionStorage.getItem('iwa-intro-seen')) {
      setPhase('done');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('iwa-intro-seen', 'true');
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('iwa-intro-seen', 'true');

    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 1400);
    const t3 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 2200);

    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  const textOpacity = phase === 'in' ? 0 : 1;
  const scale = phase === 'in' ? 0.88 : 1;
  const overlayOpacity = phase === 'out' ? 0 : 1;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0c0b09',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: overlayOpacity,
      transition: phase === 'out'
        ? 'opacity 800ms ease-in'
        : 'none',
      pointerEvents: phase === 'out' ? 'none' : 'all',
    }}>
      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: 'clamp(56px, 10vw, 96px)',
        fontWeight: 200,
        color: '#b8922a',
        opacity: textOpacity,
        transform: `scale(${scale})`,
        transition: 'opacity 600ms ease-out, transform 600ms ease-out',
      }}>いわ</div>
    </div>
  );
}
