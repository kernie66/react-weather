import { Box, Center, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import classes from '../css/Text.module.css';
import { useAtom } from 'jotai';
import { historyToggleState } from '../atoms/toggleStates.js';

const titleWidth = 220;
const paddingWidth = 16 * 2;
const controlsWidth = 38 * 2;

export default function StationLocation() {
  const { width: viewportWidth } = useViewportSize();
  const [historyOpened, toggleHistory] = useAtom(historyToggleState);

  const boxWidth = viewportWidth - paddingWidth - controlsWidth - 16;
  const buttonWidth = boxWidth - titleWidth - 16;

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
