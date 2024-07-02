import { useLocalStorage } from '@mantine/hooks';
import { createContext, useContext, useEffect, useMemo } from 'react';

const defaultLat = import.meta.env.VITE_DEFAULT_LATITUDE;
const defaultLon = import.meta.env.VITE_DEFAULT_LONGITUDE;
const defaultPosition = { lat: defaultLat, lng: defaultLon };

export const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [position, setPosition] = useLocalStorage({
    key: 'position',
    defaultValue: defaultPosition,
  });
  const [address, setAddress] = useLocalStorage({
    key: 'address',
    defaultValue: 'Rotebro, Sollentuna, Sverige',
  });

  useEffect(() => {
    if (!position) {
      setPosition(defaultPosition);
      console.debug('Position set to default');
    }
  }, [position, setPosition]);

  useEffect(() => {
    if (!address) {
      setAddress('Rotebro, Sollentuna, Sverige');
      console.debug('Address set to default');
    }
  }, [address, setAddress]);

  const getAddress = useMemo(() => {
    return address;
  }, [address]);

  const getPosition = useMemo(() => {
    return position;
  }, [position]);

  return (
    <AddressContext.Provider
      value={{ getAddress, setAddress, getPosition, setPosition }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
