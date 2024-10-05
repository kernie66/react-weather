import Temperature from './Temperature';
import MinMax from './MinMax';
import ErrorBoundary from './ErrorBoundary';
import { Group } from '@mantine/core';
import WeatherAlert from './WeatherAlert.jsx';
import { useAtomValue } from 'jotai';
import { tempColorState } from '../atoms/weatherThemeStates.js';

export default function TemperatureDisplay() {
  const tempColor = useAtomValue(tempColorState);

  return (
    <Group
      justify="space-between"
      align="center"
      gap={36}
      mt={8}
      c={tempColor}
    >
      <ErrorBoundary>
        <WeatherAlert />
        <Temperature />
      </ErrorBoundary>
      <ErrorBoundary>
        <MinMax />
      </ErrorBoundary>
    </Group>
  );
}
