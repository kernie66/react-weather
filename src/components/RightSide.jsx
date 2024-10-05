import { Divider, Group, Stack, Text } from '@mantine/core';
import { useWeatherData } from '../hooks/weatherQueries.js';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';

export default function RightSide({ minHeight = '100%' }) {
  const infoColor = useAtomValue(infoColorState);
  const { data: weatherData } = useWeatherData();

  let windGust = 0;

  if (weatherData) {
    windGust = weatherData.current.wind_speed;
    if (weatherData.current.wind_gust) {
      windGust = weatherData.current.wind_gust;
    } else if (weatherData.hourly[0].wind_gust) {
      windGust = weatherData.hourly[0].wind_gust;
    }
  }

  return (
    <Stack
      className="right-side--stack"
      mih={minHeight}
      justify="space-between"
      gap="md"
    >
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text
            fz={18}
            c="indigo.1"
            className={classes.outlineSingle}
          >
            Molntäcke
          </Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text
            fz={24}
            c={infoColor}
            className={classes.outlineSingle}
          >
            {weatherData?.current.clouds}%
          </Text>
        </Group>
      </Stack>
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text
            fz={18}
            c="indigo.1"
            className={classes.outlineSingle}
          >
            Känns som
          </Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text
            fz={24}
            c={infoColor}
            className={classes.outlineSingle}
          >
            {weatherData?.current.feels_like.toFixed(1)}&deg;C
          </Text>
        </Group>
      </Stack>
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text
            fz={18}
            c="indigo.1"
            className={classes.outlineSingle}
          >
            Vindbyar
          </Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text
            fz={24}
            c={infoColor}
            className={classes.outlineSingle}
          >
            {windGust.toFixed(1)} m/s
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}
