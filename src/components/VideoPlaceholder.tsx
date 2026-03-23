export default function VideoPlaceholder() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: '#0c0b09',
      }}>
        {/* Subtle animated gradient shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(184,146,42,0.06) 0%, transparent 70%)',
          animation: 'shimmer 8s ease-in-out infinite alternate',
        }} />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(12,11,9,0.97) 0%, rgba(12,11,9,0.4) 65%, transparent 100%)',
      }} />
      <style>{`
        @keyframes shimmer {
          from { opacity: 0.5; transform: scale(1); }
          to   { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
