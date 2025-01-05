import { useMediaQuery, useViewportSize } from '@mantine/hooks';
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
  Group,
  Loader,
  SimpleGrid,
  Stack,
  VisuallyHidden,
  em,
} from '@mantine/core';
import UpdatedAt from './UpdatedAt.jsx';
import { useWeatherData } from '../hooks/weatherQueries.js';
import SummaryBanner from './SummaryBanner.jsx';
import { lazy, Suspense } from 'react';

const FlipDisplay = lazy(() => import('./FlipDisplay'));

const mainDisplayMinHeight = 340;

export default function Body() {
  const { isLoading } = useWeatherData();
  const { width: viewportWidth } = useViewportSize();

  let limitWidth = 1024; // My iPad 6

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
        <VisuallyHidden>Laddar sidan</VisuallyHidden>
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
          <Group
            className="main-display--group"
            mih={mainDisplayMinHeight}
            mb={20}
            preventGrowOverflow={false}
            justify="space-between"
            wrap="nowrap"
          >
            <ErrorBoundary>
              {isHiddenLeft ? (
                <div />
              ) : (
                <LeftSide minHeight={mainDisplayMinHeight} />
              )}
            </ErrorBoundary>
            <Stack
              className="middle-display--stack"
              align="stretch"
              justify="flex-end"
              miw="65%"
            >
              <ErrorBoundary>
                <TemperatureDisplay />
              </ErrorBoundary>
              <Group
                className="middle-bottom--group"
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
            <ErrorBoundary>
              {isHiddenRight ? (
                <div />
              ) : (
                <RightSide minHeight={mainDisplayMinHeight} />
              )}
            </ErrorBoundary>
          </Group>
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
