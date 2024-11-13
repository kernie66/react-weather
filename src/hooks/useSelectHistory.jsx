import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentLocationState,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { TbCheck } from 'react-icons/tb';
import { rem } from '@mantine/core';
import { select } from 'radash';

export const useSelectHistory = () => {
  const [currentLocation, setCurrentLocation] = useAtom(
    currentLocationState
  );
  const setMapLocation = useSetAtom(mapLocationState);
  const historyLocations = useAtomValue(historyLocationState);
  const queryClient = useQueryClient();

  const setLocation = (newLocation) => {
    console.log('setLocation called with:', newLocation.address);
    setCurrentLocation(newLocation);
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
    showNotification({
      id: 'weatherUpdate',
      title: 'Väderposition uppdaterad',
      message: newLocation.address,
      color: 'green',
      icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
      autoClose: 5000,
      closeButtonProps: { 'aria-label': 'Stäng notis' },
    });
  };

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
