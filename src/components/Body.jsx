import {
  useMediaQuery,
  useOs,
  useViewportSize,
} from '@mantine/hooks';
import CurrentWeather from './CurrentWeather';
import ErrorBoundary from './ErrorBoundary';
import FlipDisplay from './FlipDisplay';
import Forecasts from './Forecasts';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import TemperatureDisplay from './TemperatureDisplay';
import {
  Container,
  Group,
  SimpleGrid,
  Stack,
  em,
} from '@mantine/core';

export default function Body() {
  const thisOs = useOs();
  let limitWidth = 1112; // My iPad Pro
  const { width: viewportWidth } = useViewportSize();

  if (thisOs === 'ios') {
    if (viewportWidth >= 1024) {
      limitWidth = viewportWidth;
    } else {
      limitWidth = 1112;
    }
  }
  const isHiddenLeft = useMediaQuery('(max-width: 60rem)');
  const isHiddenRight = useMediaQuery(
    '(max-width: ' + em(limitWidth - 1) + ')'
  );

  return (
    <Container fluid>
      <Group justify="space-between" h="55%" mb="xl">
        <ErrorBoundary>
          {isHiddenLeft ? <div /> : <LeftSide />}
        </ErrorBoundary>
        <Stack maw="75%">
          <ErrorBoundary>
            <TemperatureDisplay />
          </ErrorBoundary>
          <Group justify="space-around" gap="md">
            <ErrorBoundary>
              <FlipDisplay />
              <CurrentWeather />
            </ErrorBoundary>
          </Group>
        </Stack>
        <ErrorBoundary>
          {isHiddenRight ? <div /> : <RightSide />}
        </ErrorBoundary>
      </Group>
      <Group justify="center">
        <SimpleGrid
          cols={{ base: 3, sm: 4, md: 5, lg: 6 }}
          spacing="xl"
          verticalSpacing="xl"
          w="100%"
        >
          <ErrorBoundary>
            <Forecasts />
          </ErrorBoundary>
        </SimpleGrid>
      </Group>
    </Container>
  );
}
