import Temperature from './Temperature';
import MinMax from './MinMax';
import ErrorBoundary from './ErrorBoundary';
import { Grid } from '@mantine/core';
import WeatherAlert from './WeatherAlert.jsx';
import { useAtomValue } from 'jotai';
import { tempColorState } from '../atoms/weatherThemeStates.js';

export default function TemperatureDisplay() {
  const tempColor = useAtomValue(tempColorState);

  return (
    <Grid justify="center" align="center" mt={8} c={tempColor}>
      <ErrorBoundary>
        <Grid.Col span="content" miw={64}>
          <WeatherAlert />
        </Grid.Col>
        <Grid.Col span="content" miw={420} mx="lg">
          <Temperature />
        </Grid.Col>
      </ErrorBoundary>
      <ErrorBoundary>
        <Grid.Col span="content" maw={175}>
          <MinMax />
        </Grid.Col>
      </ErrorBoundary>
    </Grid>
  );
}
