import { TbCheck } from 'react-icons/tb';
import SelectMapLocation from './SelectMapLocation';
import { Group, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { historyToggleState } from '../atoms/toggleStates.js';
import MenuButton from './MenuButton.jsx';
import OpenMapButton from './OpenMapButton.jsx';
import StationLocation from './StationLocation.jsx';

export default function Header() {
  const [currentLocation, setCurrentLocation] = useAtom(
    currentLocationState
  );
  const mapLocation = useAtomValue(mapLocationState);
  const queryClient = useQueryClient();
  const [mapOpened, { open: openMap, close: closeMap }] =
    useDisclosure(false);
  const historyOpened = useAtomValue(historyToggleState);
  const [allowHistoryChange, setAllowHistoryChange] = useState(false);

  console.log('Address old:', currentLocation.address);
  console.log('Address new:', mapLocation.address);
  const updateLocation =
    allowHistoryChange &&
    mapLocation.address !== currentLocation.address;
  console.log('updateLocation', updateLocation);

  useEffect(() => {
    const setPosition = () => {
      setCurrentLocation(mapLocation);
      queryClient.invalidateQueries({ queryKey: ['weatherData'] });
      showNotification({
        id: 'weatherUpdate',
        title: 'Väderposition uppdaterad',
        message: mapLocation.address,
        color: 'green',
        icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 5000,
        closeButtonProps: { 'aria-label': 'Stäng notis' },
      });
    };

    // Only update position if changed by history popup on this page
    if (updateLocation) {
      setPosition();
    }
  }, [
    updateLocation,
    currentLocation,
    mapLocation,
    setCurrentLocation,
    queryClient,
  ]);

  // Allow history to change when page active, disable when map shown
  useEffect(() => {
    if (historyOpened && !mapOpened) {
      setAllowHistoryChange(true);
    } else {
      setAllowHistoryChange(false);
    }
  }, [historyOpened, mapOpened]);

  const closeMap2 = () => {
    closeMap();
    console.log('Close map');
  };

  return (
    <>
      <SelectMapLocation modal={mapOpened} closeModal={closeMap2} />
      <Group
        className="weather-header"
        justify="space-between"
        gap={0}
        mb={8}
      >
        <MenuButton />
        <StationLocation />
        <OpenMapButton openMap={openMap} />
      </Group>
    </>
  );
}
