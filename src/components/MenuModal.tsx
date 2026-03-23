import { useEffect, useRef } from 'react';
import './MenuModal.css';

interface Props {
  item: { name: string; badge: string; desc: string; price: string; image: string } | null;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const waLink = `https://wa.me/528111239849?text=${encodeURIComponent(`Hola, me interesa: ${item.name} (${item.price})`)}`;

  return (
    <div className="modal-bg on" ref={bgRef} onClick={(e) => { if (e.target === bgRef.current) onClose(); }}>
      <div className="modal">
        <img className="mi" src={`/images/${item.image}`} alt={item.name} />
        <div className="mbody">
          <div className="mbadge">{item.badge}</div>
          <div className="mname">{item.name}</div>
          <div className="mdesc">{item.desc}</div>
          <div className="mprice">{item.price}</div>
          <a className="mwa" href={waLink} target="_blank" rel="noopener noreferrer">
            Preguntar por WhatsApp →
          </a>
        </div>
        <div className="mc" onClick={onClose}>✕</div>
      </div>
    </div>
  );
}
