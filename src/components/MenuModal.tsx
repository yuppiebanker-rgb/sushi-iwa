import { useEffect, useRef, useState } from 'react';
import { addPreOrder, getPreOrder } from './ReservationFlow';
import './MenuModal.css';

interface Props {
  item: { name: string; badge: string; desc: string; price: string; image: string } | null;
  onClose: () => void;
  onOpenReservation?: (note: string) => void;
}

export default function MenuModal({ item, onClose, onOpenReservation }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!item) { setAdded(false); return; }
    setAdded(getPreOrder().includes(item.name));
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

  const handlePreOrder = () => {
    addPreOrder(item.name);
    setAdded(true);
    if (onOpenReservation) {
      onOpenReservation(`Seleccionaste: ${item.name} — tu mesa lo tendrá listo al llegar`);
    }
  };

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
          <button className="mpreorder" onClick={handlePreOrder} disabled={added}>
            {added ? '✓ Agregado a tu reservación' : 'Pedir con mi reservación →'}
          </button>
        </div>
        <div className="mc" onClick={onClose}>✕</div>
      </div>
    </div>
  );
}
