import { useSetState } from '@mantine/hooks';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { useAddress } from './AddressProvider.jsx';

export const LocationContext = createContext();

export default function MapLocationProvider({ children }) {
  const { getAddress, getPosition } = useAddress();
  const [mapLocation, setMapLocation] = useSetState({
    // address: getAddress,
    // position: getPosition,
  });

  useEffect(() => {
    setMapLocation({
      address: getAddress,
      position: getPosition,
    });
  }, [getPosition, getAddress, setMapLocation]);

  console.log('Location:', mapLocation);

  const getMapLocationAddress = useMemo(() => {
    return mapLocation.address;
  }, [mapLocation]);

  const getMapLocationPosition = useMemo(() => {
    return mapLocation.position;
  }, [mapLocation]);

  const value = useMemo(() => {
    return {
      setMapLocation,
      getMapLocationAddress,
      getMapLocationPosition,
    };
  }, [setMapLocation, getMapLocationAddress, getMapLocationPosition]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useMapLocation() {
  return useContext(LocationContext);
}
