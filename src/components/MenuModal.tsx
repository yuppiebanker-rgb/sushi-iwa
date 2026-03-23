import { useEffect, useRef } from 'react';
import type { MenuItem } from '../data/menu';
import './MenuModal.css';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

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

  const badgeClass = item.isSignature ? 'badge badge--signature'
    : item.isGlutenFree ? 'badge badge--gf'
    : item.isChefPick ? 'badge badge--chef'
    : 'badge';

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="modal" role="dialog" aria-label={item.name}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">&times;</button>

        <div className="modal__img-wrap">
          <img
            src={`/images/${item.image}`}
            alt={item.name}
            loading="lazy"
          />
        </div>

        <div className="modal__body">
          <span className={badgeClass}>{item.badge}</span>
          <h2 className="modal__name">{item.name}</h2>
          <p className="modal__desc">{item.description}</p>
          <p className="modal__price">{item.price}</p>
        </div>
      </div>
    </div>
  );
}
