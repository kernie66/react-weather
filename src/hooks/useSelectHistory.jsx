import { useAtomValue, useSetAtom } from 'jotai';
import {
  currentLocationState,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { select } from 'radash';
import { useSetLocation } from './useSetLocation.jsx';

export const useSelectHistory = () => {
  const currentLocation = useAtomValue(currentLocationState);
  const setMapLocation = useSetAtom(mapLocationState);
  const historyLocations = useAtomValue(historyLocationState);
  const { setLocation } = useSetLocation();

  const selectHistory = (selection, closeFn) => {
    console.log('selectHistory called with selection:', selection);
    let historyLocation = currentLocation;
    if (selection !== 'Ingen historik') {
      const newHistoryLocation = select(
        historyLocations,
        (h) => h,
        (h) => h.address === selection
      );
      historyLocation = newHistoryLocation[0];
    }
    console.log('historyLocation', historyLocation);
    setMapLocation(historyLocation);

    if (typeof closeFn === 'function') {
      setLocation(historyLocation);
      closeFn();
    }
  };
  return { selectHistory };
};
