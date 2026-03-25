import { useState, useEffect } from 'react';

export default function IntroScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in');

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem('iwa-intro-seen')) {
      setPhase('done');
      return;
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('iwa-intro-seen', '1');
      setPhase('done');
      return;
    }

    // Lock scroll
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('hold'), 700);
    const t2 = setTimeout(() => setPhase('out'), 3000);
    const t3 = setTimeout(() => {
      setPhase('done');
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.style.overflow = '';
      sessionStorage.setItem('iwa-intro-seen', '1');
    }, 4000);

    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  const opacity = phase === 'in' ? 0 : phase === 'out' ? 0 : 1;
  const scale = phase === 'in' ? 0.88 : 1;
  const bgOpacity = phase === 'out' ? 0 : 1;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0c0b09',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '14px',
      opacity: bgOpacity,
      transition: phase === 'out'
        ? 'opacity 0.85s cubic-bezier(0.4,0,0.2,1)'
        : 'none',
      pointerEvents: phase === 'out' ? 'none' : 'all',
    }}>
      {/* いわ */}
      <div style={{
        fontFamily: '"Noto Serif JP", serif',
        fontSize: 'clamp(64px, 12vw, 108px)',
        fontWeight: 200,
        color: '#b8922a',
        letterSpacing: '0.18em',
        opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
      }}>いわ</div>

      {/* SUSHI IWA */}
      <div style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '10px',
        fontWeight: 300,
        letterSpacing: '0.45em',
        textTransform: 'uppercase',
        color: 'rgba(244,239,230,0.35)',
        opacity,
        transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1) 0.15s',
      }}>SUSHI&ensp;IWA</div>
    </div>
  );
}
