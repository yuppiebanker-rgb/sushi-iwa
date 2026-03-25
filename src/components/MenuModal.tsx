import { useEffect, useRef, useState } from 'react';
import { addPreOrder, getPreOrder } from './ReservationFlow';
import { IMAGE_ALTS } from '../data/imageAlts';
import DishPairing from './DishPairing';
import './MenuModal.css';

interface Props {
  item: { id: string; name: string; badge: string; desc: string; price: string; image: string; category: string } | null;
  onClose: () => void;
  onOpenReservation?: (note: string) => void;
}

export default function MenuModal({ item, onClose, onOpenReservation }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!item) {
      setAdded(false);
      // Return focus to triggering element
      triggerRef.current?.focus();
      triggerRef.current = null;
      return;
    }

    // Save the element that triggered the modal
    triggerRef.current = document.activeElement as HTMLElement;
    setAdded(getPreOrder().includes(item.name));
    document.body.style.overflow = 'hidden';

    // Focus trap
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const waLink = `https://wa.me/528111239849?text=${encodeURIComponent(`Hola, me interesa: ${item.name} (${item.price})`)}`;
  const imageKey = item.image.replace(/\.\w+$/, '');
  const altText = IMAGE_ALTS[imageKey] || item.name;

  const handlePreOrder = () => {
    addPreOrder(item.name);
    setAdded(true);
    if (onOpenReservation) {
      onOpenReservation(`Seleccionaste: ${item.name} — tu mesa lo tendrá listo al llegar`);
    }
  };

  return (
    <div className="modal-bg on" ref={bgRef} role="dialog" aria-modal="true" aria-label={item.name} onClick={(e) => { if (e.target === bgRef.current) onClose(); }}>
      <div className="modal modal-enter" ref={modalRef}>
        <img className="mi" src={`/images/${item.image}`} alt={altText} />
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
          <DishPairing itemId={item.id} itemName={item.name} category={item.category} />
        </div>
        <button className="mc" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>
    </div>
  );
}
