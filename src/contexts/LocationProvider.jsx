import { useLocalStorage } from '@mantine/hooks';
import { replaceOrAppend, isEmpty } from 'radash';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

const defaultLat = import.meta.env.VITE_DEFAULT_LATITUDE;
const defaultLon = import.meta.env.VITE_DEFAULT_LONGITUDE;
export const defaultPosition = {
  lat: parseFloat(defaultLat),
  lng: parseFloat(defaultLon),
};
export const defaultAddress = 'Rotebro, Sollentuna, Sverige';

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [myLocation, setMyLocation] = useLocalStorage({
    key: 'location',
    defaultValue: {
      address: defaultAddress,
      position: defaultPosition,
    },
  });
  const [history, setHistory] = useLocalStorage({
    key: 'locationHistory',
    defaultValue: [],
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

  const getHistory = useMemo(() => {
    return history;
  }, [history]);

  const setLocation = useCallback(
    (newLocation) => {
      console.log('History:', history);
      console.log('Location updated:', newLocation);
      setMyLocation(newLocation);
      const newHistory = replaceOrAppend(
        history,
        newLocation,
        (f) =>
          f.address?.toLowerCase() ===
          newLocation.address.toLowerCase()
      );
      setHistory(newHistory);
      console.log('History:', newHistory);
    },
    [setMyLocation, history, setHistory]
  );

  useEffect(() => {
    if (isEmpty(myLocation))
      setLocation({
        address: defaultAddress,
        position: defaultPosition,
      });
  }, [myLocation, setLocation]);

  const value = useMemo(() => {
    return {
      getAddress,
      getPosition,
      setLocation,
      getLocation,
      getHistory,
    };
  }, [getAddress, getPosition, setLocation, getLocation, getHistory]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
