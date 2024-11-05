import { Divider, Stack, Text } from '@mantine/core';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';
import { useCurrentWeather } from '../hooks/weatherQueries.js';

export default function Humidity() {
  const infoColor = useAtomValue(infoColorState);
  const { data: currentWeather } = useCurrentWeather();

  return (
    <Stack gap={4}>
      <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
        Luftfuktighet
      </Text>
      <Divider />
      <Text fz={24} c={infoColor} className={classes.outlineSingle}>
        {currentWeather?.humidity}%
      </Text>
    </Stack>
  );
}
