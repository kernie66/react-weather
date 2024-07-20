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
  const [position, setPosition] = useLocalStorage({
    key: 'position',
    defaultValue: defaultPosition,
  });
  const [address, setAddress] = useLocalStorage({
    key: 'address',
    defaultValue: defaultAddress,
  });

  console.log('Position:', position);

  const getAddress = useMemo(() => {
    return address;
  }, [address]);

  const getPosition = useMemo(() => {
    return position;
  }, [position]);

  const value = useMemo(() => {
    return {
      setAddress,
      getAddress,
      setPosition,
      getPosition,
    };
  }, [setAddress, getAddress, setPosition, getPosition]);

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
