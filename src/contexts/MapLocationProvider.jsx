import { useSetState } from '@mantine/hooks';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { useAddress } from './AddressProvider.jsx';

export const LocationContext = createContext();

export default function MapLocationProvider({ children }) {
  const { getLocation } = useAddress();
  const [mapLocation, setMapLocation] = useSetState({
    // address: getAddress,
    // position: getPosition,
  });

  useEffect(() => {
    setMapLocation(getLocation);
  }, [getLocation, setMapLocation]);

  console.log('Location:', mapLocation);

  const getMapLocation = useMemo(() => {
    return mapLocation;
  }, [mapLocation]);

  const value = useMemo(() => {
    return {
      setMapLocation,
      getMapLocation,
    };
  }, [setMapLocation, getMapLocation]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useMapLocation() {
  return useContext(LocationContext);
}
