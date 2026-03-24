import { useState, useEffect } from 'react';

export default function PageTransition() {
  const [phase, setPhase] = useState<'idle' | 'fadeOut' | 'logo' | 'fadeIn'>('idle');

  // Intercept internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement;
      if (!link) return;

      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('wa.me') ||
        href.startsWith('#') ||
        link.target === '_blank'
      )
        return;

      // Internal navigation — use transition
      e.preventDefault();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.href = href;
        return;
      }

      setPhase('fadeOut');
      setTimeout(() => {
        setPhase('logo');
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 300);
      setTimeout(() => setPhase('fadeIn'), 650);
      setTimeout(() => setPhase('idle'), 1050);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (phase === 'idle') return null;

  const overlayOpacity = phase === 'fadeOut' ? 1 : phase === 'logo' ? 1 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        background: '#0c0b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: overlayOpacity,
        transition:
          phase === 'fadeOut'
            ? 'opacity 0.28s ease-in'
            : phase === 'fadeIn'
              ? 'opacity 0.38s ease-out'
              : 'none',
        pointerEvents: phase !== 'fadeIn' ? 'all' : 'none',
      }}
    >
      {/* いわ logo appears during logo phase */}
      <div
        style={{
          fontFamily: '"Noto Serif JP", serif',
          fontSize: 'clamp(36px, 7vw, 60px)',
          fontWeight: 200,
          color: '#b8922a',
          letterSpacing: '0.25em',
          opacity: phase === 'logo' ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        いわ
      </div>
    </div>
  );
}
