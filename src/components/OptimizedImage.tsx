import { useState, useRef, useEffect } from 'react';
import { PLACEHOLDERS } from '../data/imagePlaceholders';

interface Props {
  src: string;         // image key e.g. "camarones-roca"
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;  // true = load immediately (hero images)
  aspectRatio?: string; // default "4/3"
}

export default function OptimizedImage({ src, alt, className, style, priority, aspectRatio = '4/3' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority || false);
  const ref = useRef<HTMLDivElement>(null);
  const placeholder = PLACEHOLDERS[src] || '';

  useEffect(() => {
    if (priority || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { rootMargin: '200px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [priority]);

  return (
    <div ref={ref} style={{
      position: 'relative',
      aspectRatio,
      overflow: 'hidden',
      backgroundImage: placeholder ? `url(${placeholder})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      ...style
    }}>
      {inView && (
        <picture>
          <source srcSet={`/images/webp/${src}.webp`} type="image/webp" />
          <img
            src={`/images/${src}.jpg`}
            alt={alt}
            className={className}
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
              position: 'absolute', inset: 0
            }}
          />
        </picture>
      )}
    </div>
  );
}
