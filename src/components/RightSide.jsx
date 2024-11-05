import { Loader, Stack } from '@mantine/core';
import { useWeatherData } from '../hooks/weatherQueries.js';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';
import WindGust from './WindGust.jsx';
import CloudCover from './CloudCover.jsx';
import FeelsLike from './FeelsLike.jsx';

export default function RightSide({ minHeight = '100%' }) {
  const infoColor = useAtomValue(infoColorState);
  const { data: weatherData } = useWeatherData();

  if (!weatherData) {
    return <Loader size={32} color="indigo" />;
  }

  return (
    <Stack
      className="right-side--stack"
      mih={minHeight}
      justify="space-between"
      gap="md"
    >
      <CloudCover />
      <FeelsLike />
      <WindGust />
    </Stack>
  );
}
