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
  Center,
  Container,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  em,
} from '@mantine/core';
import UpdatedAt from './UpdatedAt.jsx';
import { useWeatherData } from '../utils/weatherQueries.js';

export default function Body() {
  const { isLoading } = useWeatherData();
  const thisOs = useOs();
  let limitWidth = 1024; // My iPad 6
  const { width: viewportWidth } = useViewportSize();

  console.log('thisOs', thisOs);
  console.log('ViewportWidth', viewportWidth);
  if (viewportWidth >= 1024) {
    limitWidth = viewportWidth;
  } else {
    limitWidth = 1112;
  }

  const isHiddenLeft = useMediaQuery('(max-width: 60rem)');
  const isHiddenRight = useMediaQuery(
    '(max-width: ' + em(limitWidth - 1) + ')'
  );

  if (isLoading) {
    return (
      <Center h="75vh">
        <Loader color="blue" size="xl" type="bars" />
      </Center>
    );
  }
  return (
    <Container fluid px={8}>
      <Grid h="45vh" mb={20}>
        <ErrorBoundary>
          <Grid.Col span="content">
            {isHiddenLeft ? <div /> : <LeftSide />}
          </Grid.Col>
        </ErrorBoundary>
        <Grid.Col span="auto">
          <Stack align="stretch" justify="flex-end">
            <ErrorBoundary>
              <TemperatureDisplay />
            </ErrorBoundary>
            <Group justify="flex-start" gap="xl" ms="sm">
              <ErrorBoundary>
                <FlipDisplay />
                <CurrentWeather />
              </ErrorBoundary>
            </Group>
          </Stack>
        </Grid.Col>
        <ErrorBoundary>
          <Grid.Col span="content">
            {isHiddenRight ? <div /> : <RightSide />}
          </Grid.Col>
        </ErrorBoundary>
      </Grid>
      <Group justify="center" h="45%">
        <SimpleGrid
          cols={{ base: 3, sm: 4, md: 6 }}
          spacing="md"
          verticalSpacing="lg"
          w="100%"
        >
          <ErrorBoundary>
            <Forecasts />
          </ErrorBoundary>
        </SimpleGrid>
      </Group>
      <UpdatedAt />
    </Container>
  );
}
