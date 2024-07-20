import { useLocalStorage } from '@mantine/hooks';
import { createContext, useContext, useMemo } from 'react';

const defaultLat = import.meta.env.VITE_DEFAULT_LATITUDE;
const defaultLon = import.meta.env.VITE_DEFAULT_LONGITUDE;
export const defaultPosition = {
  lat: parseFloat(defaultLat),
  lng: parseFloat(defaultLon),
};
export const defaultAddress = 'Rotebro, Sollentuna, Sverige';

export const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [location, setLocation] = useLocalStorage({
    key: 'location',
    defaultValue: {
      address: defaultAddress,
      position: defaultPosition,
    },
  });
  const [position, setPosition] = useLocalStorage({
    key: 'position',
    defaultValue: defaultPosition,
  });
  const [address, setAddress] = useLocalStorage({
    key: 'address',
    defaultValue: defaultAddress,
  });

  console.log('Main location:', location);

  const getAddress = useMemo(() => {
    return location.address;
  }, [location.address]);

  const getPosition = useMemo(() => {
    return location.position;
  }, [location.position]);

  const getLocation = useMemo(() => {
    return location;
  }, [location]);

  const value = useMemo(() => {
    return {
      setAddress,
      getAddress,
      setPosition,
      getPosition,
      setLocation,
      getLocation,
    };
  }, [
    setAddress,
    getAddress,
    setPosition,
    getPosition,
    setLocation,
    getLocation,
  ]);

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
