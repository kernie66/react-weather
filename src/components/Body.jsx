import { useMediaQuery } from '@mantine/hooks';
import CurrentWeather from './CurrentWeather';
import ErrorBoundary from './ErrorBoundary';
import FlipDisplay from './FlipDisplay';
import Forecasts from './Forecasts';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import TemperatureDisplay from './TemperatureDisplay';
import { Container, Group, SimpleGrid, Stack } from '@mantine/core';

export default function Body() {
  const isHiddenLeft = useMediaQuery('(max-width: 60em)');
  const isHiddenRight = useMediaQuery('(max-width: 65em)');

  return (
    <Container fluid>
      <Group justify="space-between" h="55%" mb="xl">
        <ErrorBoundary>
          {isHiddenLeft ? null : <LeftSide />}
        </ErrorBoundary>
        <Stack>
          <ErrorBoundary>
            <TemperatureDisplay />
          </ErrorBoundary>
          <Group justify="space-between" gap="5vw">
            <ErrorBoundary>
              <FlipDisplay />
              <CurrentWeather />
            </ErrorBoundary>
          </Group>
        </Stack>
        <ErrorBoundary>
          {isHiddenRight ? null : <RightSide />}
        </ErrorBoundary>
      </Group>
      <Group justify="center">
        <SimpleGrid cols={{ base: 3, sm: 5, md: 6 }} w="100vw">
          <ErrorBoundary>
            <Forecasts />
          </ErrorBoundary>
        </SimpleGrid>
      </Group>
    </Container>
  );
}
