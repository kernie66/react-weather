import { Box, Center, Text } from '@mantine/core';
import { useId, useViewportSize } from '@mantine/hooks';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import classes from '../css/Text.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { historyToggleState } from '../atoms/toggleStates.js';
import {
  currentLocationState,
  mapLocationState,
} from '../atoms/locationStates';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

const titleWidth = 220;
const paddingWidth = 16 * 2;
const controlsWidth = 38 * 2;

export default function StationLocation() {
  const { width: viewportWidth } = useViewportSize();
  const [historyOpened, toggleHistory] = useAtom(historyToggleState);
  const currentLocation = useAtomValue(currentLocationState);
  const setMapLocation = useSetAtom(mapLocationState);
  const keyId = useId('Station');

  const boxWidth = viewportWidth - paddingWidth - controlsWidth - 16;
  const buttonWidth = boxWidth - titleWidth - 16;

  useEffect(() => {
    setMapLocation(currentLocation);
    console.log('Update map location to current location');
  });

  // Remove any click-introduced parameter from togglePopover
  const togglePopover = () => {
    toggleHistory();
  };

  return (
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
            historyID={keyId}
            popover={historyOpened}
            toggle={togglePopover}
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
  );
}
