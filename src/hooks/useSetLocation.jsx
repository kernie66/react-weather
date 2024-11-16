import { useSetAtom } from 'jotai';
import { currentLocationState } from '../atoms/locationStates.js';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { TbCheck } from 'react-icons/tb';
import { rem } from '@mantine/core';

export const useSetLocation = () => {
  const setCurrentLocation = useSetAtom(currentLocationState);
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

  return { setLocation };
};
