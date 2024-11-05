import { Divider, Group, Stack, Text } from '@mantine/core';
import { useWeatherData } from '../hooks/weatherQueries.js';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';

export default function FeelsLike({ rightSide }) {
  const infoColor = useAtomValue(infoColorState);
  const { data: weatherData } = useWeatherData();

  const justifyText = rightSide ? 'flex-end' : 'flex-start';

  return (
    <Stack gap={4}>
      <Group justify={justifyText}>
        <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
          Känns som
        </Text>
      </Group>
      <Divider />
      <Group justify={justifyText}>
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {weatherData?.current.feels_like.toFixed(1)}&deg;C
        </Text>
      </Group>
    </Stack>
  );
}
