import './LocationCard.css';

export interface LocationData {
  num: string;
  city: string;
  state: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  hours: string[];
  lat?: number;
  lng?: number;
  comingSoon?: boolean;
}

export default function LocationCard({ loc }: { loc: LocationData }) {
  const mapUrl = loc.lat && loc.lng
    ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${loc.lng}!3d${loc.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx`
    : null;
  const directionsUrl = loc.lat && loc.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`
    : null;

  return (
    <div className={`lcard ${loc.comingSoon ? 'lcard--soon' : ''}`}>
      {loc.comingSoon && <div className="lcard-soon-badge">Próximamente</div>}

      {/* MAP */}
      {mapUrl && !loc.comingSoon ? (
        <div className="lcard-map">
          <iframe
            title={`Mapa ${loc.city}`}
            src={mapUrl}
            width="100%" height="220"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.95)' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : !loc.comingSoon ? (
        <div className="lcard-map lcard-map--placeholder" />
      ) : null}

      {/* BODY */}
      <div className="lcard-body">
        <div className="lcard-num">{loc.num}</div>
        <div className="lcard-city">{loc.city}</div>
        <div className="lcard-state">{loc.state}</div>
        {loc.address && <div className="lcard-address">{loc.address}</div>}
        {loc.instagram && <div className="lcard-ig">{loc.instagram}</div>}

        <div className="lcard-hours">
          {loc.hours.map((h, i) => <div key={i}>{h}</div>)}
        </div>

        {/* ACTION BUTTONS */}
        {!loc.comingSoon && (
          <div className="lcard-actions">
            {directionsUrl && (
              <a className="lcard-btn" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Cómo llegar
              </a>
            )}
            {loc.phone && (
              <a className="lcard-btn" href={`tel:${loc.phone}`}>Llamar</a>
            )}
            {loc.whatsapp && (
              <a className="lcard-btn lcard-btn--gold" href={`https://wa.me/${loc.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
