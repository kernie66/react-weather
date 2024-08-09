import { useSetState } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { MapLocationContext } from './Contexts.js';
import useLocation from '../hooks/useLocation.js';

export default function MapLocationProvider({ children }) {
  const { getLocation } = useLocation();
  const [mapLocation, setMapLocation] = useSetState({
    // address: getAddress,
    // position: getPosition,
  });

  useEffect(() => {
    setMapLocation(getLocation);
  }, [getLocation, setMapLocation]);

  console.log('Map location:', mapLocation);

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
    <MapLocationContext.Provider value={value}>
      {children}
    </MapLocationContext.Provider>
  );
}
