import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      // Ring follows with lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => {
      dotRef.current?.classList.add('cursor-hover');
      ringRef.current?.classList.add('cursor-hover');
    };
    const onLeaveInteractive = () => {
      dotRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: -4, left: -4,
        width: 8, height: 8,
        borderRadius: '50%',
        background: 'var(--gold, #b8922a)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.05s linear',
        mixBlendMode: 'normal',
      }} className="cursor-dot" />
      <div ref={ringRef} style={{
        position: 'fixed', top: -18, left: -18,
        width: 36, height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(184,146,42,0.45)',
        pointerEvents: 'none',
        zIndex: 9998,
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
      }} className="cursor-ring" />
      <style>{`
        .cursor-dot.cursor-hover { width: 12px !important; height: 12px !important; top: -6px !important; left: -6px !important; }
        .cursor-ring.cursor-hover { width: 52px !important; height: 52px !important; top: -26px !important; left: -26px !important; border-color: rgba(184,146,42,0.7) !important; }
      `}</style>
    </>
  );
}
