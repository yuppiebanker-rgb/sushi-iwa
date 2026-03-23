import { useState, useRef, useEffect } from 'react';

interface Props {
  videoSrc?: string;
  posterSrc: string;
  overlayOpacity?: number;
}

export default function HeroVideo({ videoSrc, posterSrc, overlayOpacity = 0.45 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const isMobile = window.innerWidth < 768;
  const shouldShowVideo = videoSrc && !reduceMotion && !isMobile;

  useEffect(() => {
    if (!shouldShowVideo || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [shouldShowVideo]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Background: photo always present as fallback */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={!shouldShowVideo && !reduceMotion ? 'hero-photo-bg' : undefined}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 35%',
          filter: 'brightness(0.32) saturate(0.7)',
          transition: 'opacity 1.2s ease',
          opacity: (shouldShowVideo && videoLoaded) ? 0 : 1,
        }}
      />

      {/* Video layer */}
      {shouldShowVideo && (
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: `brightness(${1 - overlayOpacity}) saturate(0.75)`,
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(12,11,9,0.97) 0%, rgba(12,11,9,0.28) 60%, transparent 100%)',
      }} />
    </div>
  );
}
