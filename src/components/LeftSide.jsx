import { useCurrentWeather } from '../hooks/weatherQueries.js';
import { Loader, Stack } from '@mantine/core';
import SunTimes from './Suntimes.jsx';
import Humidity from './Humidity.jsx';
import WindSpeed from './WindSpeed.jsx';

export default function LeftSide({ minHeight = '100%' }) {
  const { data: currentWeather } = useCurrentWeather();

  if (!currentWeather) {
    return <Loader size={32} color="indigo" />;
  }

  return (
    <Stack
      className="left-side--stack"
      mih={minHeight}
      align="flex-start"
      justify="space-between"
      gap="md"
    >
      <SunTimes />
      <Humidity />
      <WindSpeed />
    </Stack>
  );
}
