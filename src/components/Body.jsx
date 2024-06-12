import CurrentWeather from './CurrentWeather';
import ErrorBoundary from './ErrorBoundary';
import FlipDisplay from './FlipDisplay';
import Forecasts from './Forecasts';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import TemperatureDisplay from './TemperatureDisplay';
import { Container, Grid, Group, Stack } from '@mantine/core';

export default function Body() {
  return (
    <Container fluid>
      <Group justify="space-between" h="55%">
        <ErrorBoundary>
          <LeftSide />
        </ErrorBoundary>
        <ErrorBoundary>
          <Stack>
            <TemperatureDisplay />
            <Group justify="space-between">
              <ErrorBoundary>
                <FlipDisplay />
              </ErrorBoundary>
              <ErrorBoundary>
                <CurrentWeather />
              </ErrorBoundary>
            </Group>
          </Stack>
        </ErrorBoundary>
        <ErrorBoundary>
          <RightSide />
        </ErrorBoundary>
      </Group>
      <Group justify="center">
        <Grid justify="space-around" w="90%">
          <ErrorBoundary>
            <Forecasts />
          </ErrorBoundary>
        </Grid>
      </Group>
    </Container>
  );
}
