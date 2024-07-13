import Temperature from './Temperature';
import MinMax from './MinMax';
import ErrorBoundary from './ErrorBoundary';
import { Grid } from '@mantine/core';
import WeatherAlert from './WeatherAlert.jsx';

export default function TemperatureDisplay() {
  return (
    <Grid
      justify="center"
      align="center"
      mt={20}
      style={{ color: 'sandybrown' }}
    >
      <ErrorBoundary>
        <Grid.Col span={1}>
          <WeatherAlert />
        </Grid.Col>
        <Grid.Col span={7} me="xl">
          <Temperature />
        </Grid.Col>
      </ErrorBoundary>
      <ErrorBoundary>
        <Grid.Col span="content">
          <MinMax />
        </Grid.Col>
      </ErrorBoundary>
    </Grid>
  );
}
