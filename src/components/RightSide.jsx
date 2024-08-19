import { Divider, Group, Stack, Text } from '@mantine/core';
import { useWeatherData } from '../utils/weatherQueries.js';
import { useEffect, useState } from 'react';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';

export default function RightSide() {
  const infoColor = useAtomValue(infoColorState);
  const { data: weatherData } = useWeatherData();
  const [windGust, setWindGust] = useState(0);

  useEffect(() => {
    let newWindGust = weatherData?.current.wind_speed;

    if (weatherData) {
      if (weatherData.current.wind_gust) {
        newWindGust = weatherData.current.wind_gust;
      } else if (weatherData.hourly[0].wind_gust) {
        newWindGust = weatherData.hourly[0].wind_gust;
      }
    }

    setWindGust(newWindGust);
  }, [weatherData]);

  return (
    <Stack h="100%" justify="space-between" gap="md">
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
