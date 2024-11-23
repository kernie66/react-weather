import { Loader, Stack } from '@mantine/core';
import { useWeatherData } from '../hooks/weatherQueries.js';
import CloudCover from './CloudCover.jsx';
import FeelsLike from './FeelsLike.jsx';
import Humidity from './Humidity.jsx';

export default function RightSide({ minHeight = '100%' }) {
  const { data: weatherData } = useWeatherData();

  if (!weatherData) {
    return <Loader size={32} color="indigo" />;
  }

  return (
    <Stack
      className="right-side--stack"
      mih={minHeight}
      align="flex-end"
      justify="space-between"
      gap="md"
    >
      <CloudCover rightSide />
      <FeelsLike rightSide />
      <Humidity rightSide />
    </Stack>
  );
}
