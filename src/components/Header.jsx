import { TbCheck, TbMap2 } from 'react-icons/tb';
import SelectMapLocation from './SelectMapLocation';
import { Box, Button, Center, Group, rem, Text } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import classes from '../css/Text.module.css';
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

const titleWidth = 220;
const paddingWidth = 16 * 2;
const controlsWidth = 38 * 2;

export default function Header() {
  const [currentLocation, setCurrentLocation] = useAtom(
    currentLocationState
  );
  const mapLocation = useAtomValue(mapLocationState);
  const { width: viewportWidth } = useViewportSize();
  const queryClient = useQueryClient();
  const [mapOpened, { open: openMap, close: closeMap }] =
    useDisclosure(false);
  const [historyOpened, toggleHistory] = useAtom(historyToggleState);
  const [allowHistoryChange, setAllowHistoryChange] = useState(false);

  const boxWidth = viewportWidth - paddingWidth - controlsWidth - 16;
  const buttonWidth = boxWidth - titleWidth - 16;

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
        title: 'Väderposition uppdaterad',
        message: mapLocation.address,
        color: 'green',
        icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 5000,
      });
    };

    // Only update position if changed by history popup on this page
    if (updateLocation) {
      setPosition();
    }
  }, [updateLocation, mapLocation, setCurrentLocation, queryClient]);

  // Allow history to change when page active, disable when map shown
  useEffect(() => {
    if (historyOpened && !mapOpened) {
      setAllowHistoryChange(true);
    } else {
      setAllowHistoryChange(false);
    }
  }, [historyOpened, mapOpened]);

  return (
    <>
      <SelectMapLocation modal={mapOpened} closeModal={closeMap} />
      <Group
        className="weather-header"
        justify="space-between"
        gap={0}
        mb={8}
      >
        <MenuButton />
        <Box w={boxWidth} px={4}>
          <Center>
            <Text xs="10" className={classes.outlineHeader}>
              <Text
                span
                px={4}
                maw={titleWidth}
                className={classes.outlineHeader}
              >
                Väderstation:
              </Text>
              <SelectHistoryLocation
                popover={historyOpened}
                toggle={toggleHistory}
                buttonProps={{
                  size: 'lg',
                  width: buttonWidth,
                  variant: 'subtle',
                  px: 4,
                }}
                textClass={classes.outlineHeader}
                closeOnSelect
              />
            </Text>
          </Center>
        </Box>
        <Button
          variant="subtle"
          fz={36}
          px={0}
          c="crimson"
          onClick={openMap}
        >
          <TbMap2 />
        </Button>
      </Group>
    </>
  );
}
