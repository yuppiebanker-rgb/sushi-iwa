import LocationCard, { type LocationData } from '../components/LocationCard';
import './Locations.css';

const LOCATIONS: LocationData[] = [
  {
    num: '01', city: 'Monterrey', state: 'Nuevo León',
    address: 'Av. Fundadores 955, Sienna Tower, 2° piso',
    phone: '+528111239849', whatsapp: '528111239849',
    hours: ['L·Mi·J·V·S·D 1:45–10:30pm', 'Cerramos los martes'],
    lat: 25.6541, lng: -100.3677,
  },
  {
    num: '02', city: 'Saltillo', state: 'Coahuila',
    instagram: '@iwa.saltillo',
    hours: ['Lu–Mi 1:30–11:30pm', 'J–S 1:30pm–12:30am', 'D 1:30–7:00pm'],
    lat: 25.4232, lng: -100.9963,
  },
  {
    num: '03', city: 'Hermosillo', state: 'Sonora',
    instagram: '@iwa.hmo', phone: '+526621918131',
    hours: ['M–Mi 1–12am', 'J–S 1pm–2am', 'D 1–11pm · L cerrado'],
    lat: 29.0729, lng: -110.9559,
  },
  {
    num: '04', city: 'Cd. Obregón', state: 'Sonora',
    hours: ['Horario próximamente'],
    lat: 27.4827, lng: -109.9307,
  },
  {
    num: '05', city: 'Mazatlán', state: 'Sinaloa',
    hours: ['Próxima apertura'], comingSoon: true,
  },
];

export default function Locations() {
  return (
    <div className="loc-page">
      <div className="loc-hero">
        <div className="loc-hero-bg" style={{ backgroundImage: `url(/images/interior.jpg)` }} />
        <div className="loc-hero-ov" />
        <div className="loc-hero-c">
          <div className="loc-hero-tag">Nuestras ubicaciones</div>
          <h1 className="loc-hero-h">Encuéntranos en <em>5 ciudades</em></h1>
        </div>
      </div>

      <div className="loc-grid">
        {LOCATIONS.map(loc => (
          <LocationCard key={loc.city} loc={loc} />
        ))}
      </div>
    </div>
  );
}
