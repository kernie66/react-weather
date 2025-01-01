import {
  Divider,
  Stack,
  UnstyledButton,
  VisuallyHidden,
} from '@mantine/core';
import dayjs from 'dayjs';
import { getSunTimes } from '../helpers/getSunInfo.js';
import SunIcon from './SunIcon.jsx';
import { useDisclosure } from '@mantine/hooks';
import SunInfoModal from './SunInfoModal.jsx';
import { useAtomValue } from 'jotai';
import { currentPositionState } from '../atoms/locationStates.js';

export default function SunTimes() {
  const currentPosition = useAtomValue(currentPositionState);
  const [sunInfoOpened, { open: openSunInfo, close: closeSunInfo }] =
    useDisclosure(false);

  const { sunriseTime, sunsetTime, afterSunrise } = getSunTimes(
    dayjs(),
    currentPosition
  );

  return (
    <>
      <SunInfoModal
        sunInfoOpened={sunInfoOpened}
        closeSunInfo={closeSunInfo}
      />
      <UnstyledButton onClick={openSunInfo}>
        <Stack gap={8}>
          <SunIcon
            isSunset={afterSunrise}
            sunTime={afterSunrise ? sunsetTime : sunriseTime}
          />
          <Divider />
          <SunIcon
            isSunset={!afterSunrise}
            sunTime={!afterSunrise ? sunsetTime : sunriseTime}
          />
        </Stack>
        <VisuallyHidden>Soltider</VisuallyHidden>
      </UnstyledButton>
    </>
  );
}
