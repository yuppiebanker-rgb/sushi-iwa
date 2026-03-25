import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export const LOCATIONS = [
  { id: 'mty', name: 'Monterrey', short: 'MTY', color: '#b8922a' },
  { id: 'sal', name: 'Saltillo',  short: 'SAL', color: '#5a7a8a' },
  { id: 'hmo', name: 'Hermosillo', short: 'HMO', color: '#7a8a5a' },
  { id: 'obr', name: 'Cd. Obregón', short: 'OBR', color: '#8a5a7a' },
];

interface LocationCtx {
  locationId: string;
  location: typeof LOCATIONS[0];
  setLocationId: (id: string) => void;
}

const LocationContext = createContext<LocationCtx>({
  locationId: 'mty',
  location: LOCATIONS[0],
  setLocationId: () => {},
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locationId, setLocationIdState] = useState(
    () => localStorage.getItem('iwa_staff_location') || 'mty'
  );

  const setLocationId = (id: string) => {
    setLocationIdState(id);
    localStorage.setItem('iwa_staff_location', id);
  };

  const location = LOCATIONS.find(l => l.id === locationId) || LOCATIONS[0];

  return (
    <LocationContext.Provider value={{ locationId, location, setLocationId }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation_ = () => useContext(LocationContext);
