import { useLocalStorage } from '@mantine/hooks';
import { replaceOrAppend } from 'radash';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';

const defaultLat = import.meta.env.VITE_DEFAULT_LATITUDE;
const defaultLon = import.meta.env.VITE_DEFAULT_LONGITUDE;
export const defaultPosition = {
  lat: parseFloat(defaultLat),
  lng: parseFloat(defaultLon),
};
export const defaultAddress = 'Rotebro, Sollentuna, Sverige';

export const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [myLocation, setMyLocation] = useLocalStorage({
    key: 'location',
    defaultValue: {
      address: defaultAddress,
      position: defaultPosition,
    },
  });
  const [history, setHistory] = useLocalStorage({
    key: 'locationHistory',
  });

  console.log('Main location:', myLocation);

  const getAddress = useMemo(() => {
    return myLocation.address;
  }, [myLocation.address]);

  const getPosition = useMemo(() => {
    return myLocation.position;
  }, [myLocation.position]);

  const getLocation = useMemo(() => {
    return myLocation;
  }, [myLocation]);

  const setLocation = useCallback(
    (newLocation) => {
      console.log('Location updated:', newLocation);
      setMyLocation(newLocation);
      const newHistory = replaceOrAppend(
        history,
        newLocation,
        (f) => f.address === newLocation.address
      );
      setHistory(newHistory);
      console.log('History:', newHistory);
    },
    [setMyLocation, history, setHistory]
  );

  const value = useMemo(() => {
    return {
      getAddress,
      getPosition,
      setLocation,
      getLocation,
    };
  }, [getAddress, getPosition, setLocation, getLocation]);

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
