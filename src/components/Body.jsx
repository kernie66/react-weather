import CurrentWeather from './CurrentWeather';
import ErrorBoundary from './ErrorBoundary';
import FlipDisplay from './FlipDisplay';
import Forecasts from './Forecasts';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import TemperatureDisplay from './TemperatureDisplay';
import { Container, Group, SimpleGrid, Stack } from '@mantine/core';

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
            <Group justify="space-between" gap="5vw">
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
        <SimpleGrid cols={6} w="90%">
          <ErrorBoundary>
            <Forecasts />
          </ErrorBoundary>
        </SimpleGrid>
      </Group>
    </Container>
  );
}
