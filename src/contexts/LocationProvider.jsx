import { useLocalStorage } from '@mantine/hooks';
import { replaceOrAppend, isEmpty } from 'radash';
import { useCallback, useEffect, useMemo } from 'react';
import { LocationContext } from './Contexts.js';
import {
  defaultAddress,
  defaultPosition,
} from '../hooks/useLocation.js';

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
      // Add to history unless default location
      if (newLocation.address !== defaultAddress) {
        const newHistory = replaceOrAppend(
          history,
          newLocation,
          (f) =>
            f.address?.toLowerCase() ===
            newLocation.address.toLowerCase()
        );
        setHistory(newHistory);
        console.log('History:', newHistory);
      }
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
