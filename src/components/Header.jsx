import { TbCheck, TbMap2 } from 'react-icons/tb';
import SelectLocation from './SelectLocation';
import FullScreenButton from './FullScreenButton.jsx';
import { Box, Button, Center, Group, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import classes from '../css/Text.module.css';
import { useLocation } from '../contexts/LocationProvider.jsx';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';

export default function Header() {
  const { setLocation, getLocation } = useLocation();
  const { getMapLocation } = useMapLocation();
  const queryClient = useQueryClient();
  const [mapOpened, { open: openMap, close: closeMap }] =
    useDisclosure(false);
  const [historyOpened, { toggle: toggleHistory }] =
    useDisclosure(false);
  const [historyActive, setHistoryActive] = useState(false);

  useEffect(() => {
    const setPosition = () => {
      console.log('Address 1:', getMapLocation.address);
      console.log('Address 2:', getLocation.address);
      if (getMapLocation.address !== getLocation.address) {
        setLocation(getMapLocation);
        queryClient.invalidateQueries({ queryKey: ['weatherData'] });
        showNotification({
          title: 'Väderposition uppdaterad',
          message: getMapLocation.address,
          color: 'green',
          icon: (
            <TbCheck style={{ width: rem(18), height: rem(18) }} />
          ),
          autoClose: 5000,
        });
      }
    };
    console.log('In set position effect', historyActive);
    if (historyActive) {
      setPosition();
    }
  }, [
    getLocation.address,
    getMapLocation,
    setLocation,
    queryClient,
    historyActive,
  ]);

  useEffect(() => {
    console.log('History opened:', historyOpened);
    if (historyOpened) {
      setHistoryActive(true);
    } else if (mapOpened) {
      setHistoryActive(false);
    }
  }, [historyOpened, mapOpened]);

  return (
    <>
      <SelectLocation modal={mapOpened} closeModal={closeMap} />
      <Group justify="space-between">
        <FullScreenButton />
        <Box w="75vw">
          <Center>
            <Text xs="10" className={classes.outlineLg} lineClamp={1}>
              Väderstation:&nbsp;
              <SelectHistoryLocation
                popover={historyOpened}
                toggle={toggleHistory}
                buttonSize="lg"
                textClass={classes.outlineLg}
                closeOnSelect
              />
            </Text>
          </Center>
        </Box>
        <Button variant="transparent" onClick={openMap}>
          <TbMap2 size={36} color="crimson" />
        </Button>
      </Group>
    </>
  );
}
