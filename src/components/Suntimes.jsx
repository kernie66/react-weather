import { Divider, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import { useWeatherPosition } from '../utils/weatherQueries.js';
import { getSunTimes } from '../helpers/getSunInfo.js';
import SunIcon from './SunIcon.jsx';

export default function SunTimes() {
  const { data: position } = useWeatherPosition();

  const { sunriseTime, sunsetTime, afterSunrise } = getSunTimes(
    dayjs(),
    position
  );

  return (
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
  );
}
