import { Text } from '@mantine/core';
import MarqueeText from 'react-marquee-text';
import { useTodaysWeather } from '../utils/weatherQueries.js';

export default function SummaryBanner() {
  const { data: today } = useTodaysWeather();
  return (
    <MarqueeText direction="right" textSpacing="3rem">
      <Text c="gray.0" w="100%">
        {today.summary}
      </Text>
    </MarqueeText>
  );
}
