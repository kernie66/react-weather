import {
  useMediaQuery,
  useOs,
  useViewportSize,
} from '@mantine/hooks';
import CurrentWeather from './CurrentWeather';
import ErrorBoundary from './ErrorBoundary';
// import FlipDisplay from './FlipDisplay';
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
import { useWeatherData } from '../hooks/weatherQueries.js';
import SummaryBanner from './SummaryBanner.jsx';
import { lazy, Suspense } from 'react';

const FlipDisplay = lazy(() => import('./FlipDisplay'));

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
    <Container className="weather-body" fluid px={0}>
      <Suspense fallback={<div>Vänta lite...</div>}>
        <Stack
          className="weather-body--stack"
          justify="space-around"
          mih="90vh"
          gap="sm"
        >
          <Grid mih={340} mb={20} align="stretch">
            <ErrorBoundary>
              <Grid.Col className="left-col" span="content">
                {isHiddenLeft ? <div /> : <LeftSide />}
              </Grid.Col>
            </ErrorBoundary>
            <Grid.Col className="middle-col" span="auto">
              <Stack align="stretch" justify="flex-end">
                <ErrorBoundary>
                  <TemperatureDisplay className="top-group" />
                </ErrorBoundary>
                <Group
                  className="middle-group"
                  justify="center"
                  grow
                  wrap="nowrap"
                  gap={{ base: 'md', lg: 'xl' }}
                  py={8}
                >
                  <ErrorBoundary>
                    <FlipDisplay />
                    <CurrentWeather />
                  </ErrorBoundary>
                </Group>
              </Stack>
            </Grid.Col>
            <ErrorBoundary>
              <Grid.Col className="right-col" span="content">
                {isHiddenRight ? <div /> : <RightSide />}
              </Grid.Col>
            </ErrorBoundary>
          </Grid>
          <Group className="bottom-group" justify="center" mih={240}>
            <ErrorBoundary>
              <SummaryBanner />
              <SimpleGrid
                cols={{ base: 3, sm: 4, md: 6 }}
                spacing="md"
                verticalSpacing="lg"
                w="100%"
              >
                <Forecasts />
              </SimpleGrid>
              <UpdatedAt />
            </ErrorBoundary>
          </Group>
        </Stack>
      </Suspense>
    </Container>
  );
}
