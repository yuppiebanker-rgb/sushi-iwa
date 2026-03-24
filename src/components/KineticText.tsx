import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
  stagger?: number;
  threshold?: number;
}

export default function KineticText({
  text,
  tag = 'div',
  style,
  className,
  delay = 0,
  stagger = 55,
  threshold = 0.3,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  const words = text.split(' ');
  const Tag = tag as React.ElementType;

  return (
    <Tag ref={ref} style={{ ...style, overflow: 'hidden' }} className={className}>
      {words.map((word: string, i: number) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginRight: '0.28em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(110%)',
              transition: visible
                ? `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms`
                : 'none',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
