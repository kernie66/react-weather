import { Divider, Group, Stack, Text } from '@mantine/core';
import { useWeatherData } from '../hooks/weatherQueries.js';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';

export default function CloudCover() {
  const infoColor = useAtomValue(infoColorState);
  const { data: weatherData } = useWeatherData();

  return (
    <Stack gap={4}>
      <Group justify="flex-end">
        <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
          Molntäcke
        </Text>
      </Group>
      <Divider />
      <Group justify="flex-end">
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {weatherData?.current.clouds}%
        </Text>
      </Group>
    </Stack>
  );
}
