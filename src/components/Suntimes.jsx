import {
  Divider,
  Stack,
  UnstyledButton,
  VisuallyHidden,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useWeatherPosition } from '../hooks/weatherQueries.js';
import { getSunTimes } from '../helpers/getSunInfo.js';
import SunIcon from './SunIcon.jsx';
import { useDisclosure } from '@mantine/hooks';
import SunInfoModal from './SunInfoModal.jsx';

export default function SunTimes() {
  const { data: position } = useWeatherPosition();
  const [sunInfoOpened, { open: openSunInfo, close: closeSunInfo }] =
    useDisclosure(false);

  const { sunriseTime, sunsetTime, afterSunrise } = getSunTimes(
    dayjs(),
    position
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
