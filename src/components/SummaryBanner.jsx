import { Group, Text } from '@mantine/core';
import MarqueeText from 'react-marquee-text';
import {
  useDailyWeather,
  useTodaysWeather,
} from '../utils/weatherQueries.js';
import classes from '../css/Text.module.css';

export default function SummaryBanner() {
  const { data: today } = useTodaysWeather();
  const { data: tomorrow } = useDailyWeather(1);

  return (
    <MarqueeText direction="right" textSpacing="3rem">
      <Group className={classes.outlineSingle} gap={8}>
        <Text c="orange.3">Idag:</Text>
        <Text c="gray.0" pe="xl">
          {today.summary}
        </Text>
        <Text c="orange.3">Imorgon:</Text>
        <Text c="gray.0" pe="xl">
          {tomorrow.summary}
        </Text>
      </Group>
    </MarqueeText>
  );
}
