import { TbCheck, TbMap2 } from 'react-icons/tb';
import SelectLocation from './SelectLocation';
import FullScreenButton from './FullScreenButton.jsx';
import { Box, Button, Center, Group, rem, Text } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import classes from '../css/Text.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import useLocation from '../hooks/useLocation.js';
import useMapLocation from '../hooks/useMapLocation.js';

const titleWidth = 220;
const paddingWidth = 16 * 2;
const controlsWidth = 38 * 2;

export default function Header() {
  const { width: viewportWidth } = useViewportSize();
  const { setLocation, getLocation } = useLocation();
  const { getMapLocation } = useMapLocation();
  const queryClient = useQueryClient();
  const [mapOpened, { open: openMap, close: closeMap }] =
    useDisclosure(false);
  const [historyOpened, { toggle: toggleHistory }] =
    useDisclosure(false);
  const [historyActive, setHistoryActive] = useState(false);

  const boxWidth = viewportWidth - paddingWidth - controlsWidth - 16;
  const buttonWidth = boxWidth - titleWidth - 16;

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

    // Only update position if changed by history popup on this page
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

  // Allow history to change when page active, disable when map shown
  useEffect(() => {
    if (historyOpened) {
      setHistoryActive(true);
    } else if (mapOpened) {
      setHistoryActive(false);
    }
  }, [historyOpened, mapOpened]);

  return (
    <>
      <SelectLocation modal={mapOpened} closeModal={closeMap} />
      <Group justify="space-between" gap={0}>
        <FullScreenButton />
        <Box w={boxWidth} px={4}>
          <Center>
            <Text xs="10" className={classes.outlineHeader}>
              <Text
                span
                px={8}
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
