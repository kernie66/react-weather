import { Group, Text } from '@mantine/core';
import {
  useDailyWeather,
  useTodaysWeather,
} from '../utils/weatherQueries.js';
import classes from '../css/Text.module.css';
import Marquee from 'react-fast-marquee';
import { useAtomValue } from 'jotai';
import {
  backgroundColorState,
  infoColorState,
} from '../atoms/weatherThemeStates.js';

export default function SummaryBanner() {
  const infoColor = useAtomValue(infoColorState);
  const backgroundColor = useAtomValue(backgroundColorState);
  const { data: today } = useTodaysWeather();
  const { data: tomorrow } = useDailyWeather(1);

  return (
    <Marquee autofill gradient gradientColor={backgroundColor}>
      <Group className={classes.outlineSingle} gap={8} w="125vw">
        <Text c={infoColor} fz={18}>
          Idag:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {today.summary}
        </Text>
        <Text c={infoColor} fz={18}>
          Imorgon:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {tomorrow.summary}
        </Text>
      </Group>
    </Marquee>
  );
}
